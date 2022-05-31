import SettingsContext from 'features/Settings/context';
import React, { useCallback, useContext } from 'react';
import { convertToCurrency, useConverter } from 'utils/converters';
import { CurrencyRates } from '../Currency/api';
import { TaxCalculatorContext } from './state';
import taxCalculator, { constants, TaxSystem } from './taxRates';

const TaxTable: React.FC = () => {
	const {
		values: { currencyRates, preferredDisplayCurrency },
	} = useContext(SettingsContext);
	const countries = Object.keys(taxCalculator).sort();

	const calculator = useCallback(
		(a: number, s: TaxSystem) => getCalculator(preferredDisplayCurrency, currencyRates)(a, s),
		[preferredDisplayCurrency, currencyRates]
	);

	return (
		<div className="overflow-x-auto">
			<table className="w-full">
				<TableHeader columns={columns} />
				<TableBody columns={columns} countries={countries} calculator={calculator} />
			</table>
		</div>
	);
};

export default TaxTable;

interface TableBodyProps {
	countries: string[];
	columns: string[];
	calculator: (amount: number, system: TaxSystem) => CalculationResult;
}

const TableBody: React.FC<TableBodyProps> = ({ countries, columns, calculator }) => {
	const {
		values: { currencyRates, preferredDisplayCurrency },
	} = useContext(SettingsContext);
	const {
		state: { salary },
	} = useContext(TaxCalculatorContext);

	if (!salary) return null;

	return (
		<tbody>
			{countries.map(country => {
				const localSalary = convertToCurrency(
					salary,
					currencyRates.usd,
					preferredDisplayCurrency,
					taxCalculator[country].currency
				);
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const result: any = calculator(localSalary, taxCalculator[country]);

				return (
					<tr key={country} className="odd:bg-gray-100 dark:odd:bg-gray-800">
						{columns.map(c => (
							<td key={c} className="whitespace-nowrap px-4 text-right first:text-left">
								{result[c]}
							</td>
						))}
					</tr>
				);
			})}
		</tbody>
	);
};

const TableHeader: React.FC<{ columns: string[] }> = ({ columns }) => (
	<thead>
		{columns.map(c => (
			<th key={c} className="whitespace-nowrap px-4 font-bold text-gray-700 dark:text-gray-500">
				{c}
			</th>
		))}
	</thead>
);

const columns = [
	'Country',
	// 'Base salary',
	'Taxes',
	'After tax',
	// 'Hourly rate',
	'Tax percent',
	'Local gross salary',
	'Local salary',
	'Monthly cash',
	'Gross salary (DKK)',
	'Salary (DKK)',
];

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
			'Base salary': format(amount),
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
	'Base salary': string;
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
