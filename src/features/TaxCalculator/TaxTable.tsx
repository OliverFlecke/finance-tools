import SettingsContext from 'features/Settings/context';
import React, { useCallback, useContext } from 'react';
import { convertToCurrency, useConverter } from 'utils/converters';
import { CurrencyRates } from '../Currency/api';
import { TaxCalculatorContext } from './state';
import taxCalculator, { constants, TaxSystem } from './taxRates';

const TaxTable: React.FC = () => {
	const {
		values: { currencyRates },
	} = useContext(SettingsContext);
	const {
		state: { currency },
	} = useContext(TaxCalculatorContext);

	const countries = Object.keys(taxCalculator).sort();

	const calculator = useCallback(
		(a: number, s: TaxSystem) => getCalculator(currency, currencyRates)(a, s),
		[currency, currencyRates]
	);

	return (
		<div className="overflow-x-auto">
			<table className="w-full">
				<TableHeader />
				<TableBody countries={countries} calculator={calculator} />
			</table>
		</div>
	);
};

export default TaxTable;

interface TableBodyProps {
	countries: string[];
	calculator: (amount: number, system: TaxSystem) => CalculationResult;
}

const TableBody: React.FC<TableBodyProps> = ({ countries, calculator }) => {
	const {
		values: { currencyRates },
	} = useContext(SettingsContext);
	const {
		state: { salary, currency },
	} = useContext(TaxCalculatorContext);

	if (!salary) return null;

	return (
		<tbody>
			{countries.map(country => {
				const localSalary = convertToCurrency(
					salary,
					currencyRates.usd,
					currency,
					taxCalculator[country].currency
				);
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const result = calculator(localSalary, taxCalculator[country]);

				return (
					<tr key={country} className="tax-row">
						<td>{result.Country}</td>
						<td>{result.Taxes}</td>
						<td>{result['After tax']}</td>
						<td>{result['Tax percent']}</td>
						<td>{result['Local gross salary']}</td>
						<td>{result['Local salary']}</td>
						<td>{result['Monthly cash']}</td>
						<td>{result['Gross salary (DKK)']}</td>
						<td>{result['Salary (DKK)']}</td>
					</tr>
				);
			})}
		</tbody>
	);
};

const TableHeader: React.FC = () => {
	const {
		values: { preferredDisplayCurrency },
	} = useContext(SettingsContext);

	return (
		<thead className="tax-header">
			<th>Country</th>
			<th>Taxes</th>
			<th>Net salary</th>
			<th>Tax percent</th>
			<th>Local gross salary</th>
			<th>Local net salary</th>
			<th>Net salary (monthly)</th>
			<th>Gross salary ({preferredDisplayCurrency})</th>
			<th>Net salary ({preferredDisplayCurrency})</th>
		</thead>
	);
};

function getCalculator(defaultCurrency: string, rates: CurrencyRates) {
	return function (amount: number, system: TaxSystem): CalculationResult {
		let result = system.calculate(amount);

		if (defaultCurrency !== system.currency) {
			const converter = useConverter(system.currency, defaultCurrency, rates.usd);

			result = {
				pre_tax: converter(amount),
				taxes: converter(result.taxes),
				after_tax: converter(result.after_tax),
			};
			amount = converter(amount);
		}
		const salary_per_hour_after_tax =
			result.after_tax / constants.workdays_per_year / constants.hours_per_day;
		const tax_percentage = result.taxes / amount;

		const local_salary_gross = convertToCurrency(
			amount,
			rates.usd,
			defaultCurrency,
			system.currency
		);
		const local_salary = convertToCurrency(
			result.after_tax,
			rates.usd,
			defaultCurrency,
			defaultCurrency
		);

		const format = (n: number, currency: string = defaultCurrency) => {
			const formatter = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency,
			});

			return formatter.format(n);
		};

		return {
			Country: system.country,
			baseSalary: format(amount),
			Taxes: format(result.taxes),
			'After tax': format(result.after_tax),
			'Hourly rate': format(salary_per_hour_after_tax),
			'Tax percent': tax_percentage.toLocaleString(undefined, {
				style: 'percent',
			}),
			'Local gross salary': format(local_salary_gross, system.currency),
			'Local salary': format(local_salary, system.currency),
			'Monthly cash': format(local_salary / 12, system.currency),
			'Gross salary (DKK)': format(
				convertToCurrency(amount, rates.usd, system.currency, defaultCurrency),
				constants.output_currency
			),
			'Salary (DKK)': format(
				convertToCurrency(result.after_tax, rates.usd, system.currency, defaultCurrency),
				constants.output_currency
			),
		};
	};
}

interface CalculationResult {
	Country: string;
	baseSalary: string;
	Taxes: string;
	'After tax': string;
	'Hourly rate': string;
	'Tax percent': string;
	'Local gross salary': string;
	'Local salary': string;
	'Monthly cash': string;
	'Gross salary (DKK)': string;
	'Salary (DKK)': string;
}
