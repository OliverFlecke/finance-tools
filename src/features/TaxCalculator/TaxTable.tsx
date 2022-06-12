import SettingsContext from 'features/Settings/context';
import React, { useCallback, useContext } from 'react';
import { convertToCurrency, formatCurrency, useConverter } from 'utils/converters';
import { CurrencyRates } from '../Currency/api';
import { TaxCalculatorContext, TaxCalculatorOptions } from './state';
import taxCalculator, { TaxSystem } from './taxRates';

const TaxTable: React.FC = () => {
	const {
		values: { currencyRates },
	} = useContext(SettingsContext);
	const {
		state: { salary, currency, workOptions },
	} = useContext(TaxCalculatorContext);

	const countries = Object.keys(taxCalculator).sort();

	const calculator = useCallback(
		(a: number, s: TaxSystem) => getCalculator(currency, currencyRates, workOptions)(a, s),
		[currency, currencyRates, workOptions]
	);

	if (!salary) return null;

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
				const localCurrency = taxCalculator[country].currency;
				const localSalary = convertToCurrency(salary, currencyRates.usd, currency, localCurrency);
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const result = calculator(localSalary, taxCalculator[country]);

				return (
					<tr key={country} className="tax-row">
						<td>{result.country}</td>
						<td>{formatCurrency(result.baseSalaryLocal, localCurrency)}</td>
						<td className="text-green-700 dark:text-green-400">
							{formatCurrency(result.afterTax, currency)}
						</td>
						<td className="text-red-700 dark:text-red-400">
							{formatCurrency(result.taxes, currency)}
						</td>
						<td>
							{result.taxPercent.toLocaleString(undefined, {
								style: 'percent',
							})}
						</td>
						<td>{formatCurrency(result.localSalaryGross, localCurrency)}</td>
						<td>{formatCurrency(result.localSalary, localCurrency)}</td>
						<td>{formatCurrency(result.monthlyCash, localCurrency)}</td>
						<td>{formatCurrency(result.hourlyRate, localCurrency)}</td>
					</tr>
				);
			})}
		</tbody>
	);
};

const TableHeader: React.FC = () => {
	return (
		<thead className="tax-header">
			<th>Country</th>
			<th>Local base salary</th>
			<th>Net salary</th>
			<th>Taxes</th>
			<th>Tax percent</th>
			<th>Local gross salary</th>
			<th>Local net salary</th>
			<th>Net salary (monthly)</th>
			<th>Hourly net salary</th>
		</thead>
	);
};

function getCalculator(
	defaultCurrency: string,
	rates: CurrencyRates,
	options: TaxCalculatorOptions
) {
	return function (amount: number, system: TaxSystem): CalculationResult {
		let result = system.calculate(amount);
		const converter = useConverter(system.currency, defaultCurrency, rates.usd);

		if (defaultCurrency !== system.currency) {
			result = {
				pre_tax: converter(amount),
				taxes: converter(result.taxes),
				after_tax: converter(result.after_tax),
			};
			amount = converter(amount);
		}
		const salary_per_hour_after_tax =
			result.after_tax / (options.workdaysPerYear * options.hoursPerDay);
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
			system.currency
		);

		return {
			country: system.country,
			baseSalary: amount,
			baseSalaryLocal: convertToCurrency(amount, rates.usd, defaultCurrency, system.currency),
			taxes: result.taxes,
			afterTax: result.after_tax,
			hourlyRate: salary_per_hour_after_tax,
			taxPercent: tax_percentage,
			localSalaryGross: local_salary_gross,
			localSalary: local_salary,
			monthlyCash: local_salary / 12,
		};
	};
}

interface CalculationResult {
	country: string;
	baseSalary: number;
	baseSalaryLocal: number;
	taxes: number;
	afterTax: number;
	hourlyRate: number;
	taxPercent: number;
	localSalaryGross: number;
	localSalary: number;
	monthlyCash: number;
}
