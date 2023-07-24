import SettingsContext from 'features/Settings/context';
import React, { useCallback, useContext } from 'react';
import {
	convertToCurrency,
	formatCurrency,
	useConverter,
} from 'utils/converters';
import { CurrencyRates } from '../Currency/api';
import { TaxCalculatorContext, TaxCalculatorOptions } from './state';
import taxCalculator, { TaxSystem } from './taxRates';

const formatOptions = {
	maximumFractionDigits: 0,
};

export default function TaxTable() {
	const {
		values: { currencyRates, preferredDisplayCurrency },
	} = useContext(SettingsContext);
	const {
		state: { salary, currency, workOptions },
	} = useContext(TaxCalculatorContext);

	const countries = Object.keys(taxCalculator).sort();

	const calculator = useCallback(
		(a: number, s: TaxSystem) =>
			getCalculator(
				currency,
				preferredDisplayCurrency,
				currencyRates,
				workOptions
			)(a, s),
		[currency, preferredDisplayCurrency, currencyRates, workOptions]
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
}

interface TableBodyProps {
	countries: string[];
	calculator: (amount: number, system: TaxSystem) => CalculationResult;
}

function TableBody({ countries, calculator }: TableBodyProps) {
	const {
		state: { salary, currency },
	} = useContext(TaxCalculatorContext);

	if (!salary) return null;

	return (
		<tbody>
			{countries.map(country => (
				<TableRow
					key={country}
					country={country}
					salary={salary}
					currency={currency}
					calculator={calculator}
				/>
			))}
		</tbody>
	);
}

interface TableRowProps {
	country: string;
	salary: number;
	currency: string;
	calculator: (amount: number, system: TaxSystem) => CalculationResult;
}

function TableRow({ country, salary, currency, calculator }: TableRowProps) {
	const {
		values: { currencyRates, preferredDisplayCurrency },
	} = useContext(SettingsContext);
	const localCurrency = taxCalculator[country].currency;
	const localSalary = convertToCurrency(
		salary,
		currencyRates.usd,
		currency,
		localCurrency
	);
	const result = calculator(localSalary, taxCalculator[country]);

	const formatLocal = useCallback(
		(v: number) => formatCurrency(v, localCurrency, formatOptions),
		[localCurrency]
	);
	const formatPreferred = useCallback(
		(v: number) => formatCurrency(v, preferredDisplayCurrency, formatOptions),
		[preferredDisplayCurrency]
	);

	return (
		<tr key={country} className="tax-row">
			<td>{result.country}</td>
			<td className="text-yellow-700 dark:text-yellow-400">
				{formatPreferred(result.preferred.salaryGross)}
			</td>
			<td className="text-green-700 dark:text-green-400">
				{formatPreferred(result.preferred.salaryNet)}
			</td>
			<td className="text-red-700 dark:text-red-400">
				{formatPreferred(result.preferred.taxes)}
			</td>
			<td>
				{result.taxPercent.toLocaleString(undefined, {
					style: 'percent',
				})}
			</td>
			<td>{formatLocal(result.local.salaryGross)}</td>
			<td>{formatLocal(result.local.salaryNet)}</td>
			<td>{formatLocal(result.local.salaryGross / 12)}</td>
			<td>{formatLocal(result.local.salaryNet / 12)}</td>
			<td>{formatPreferred(result.preferred.hourlyRateNet)}</td>
		</tr>
	);
}

function TableHeader() {
	return (
		<thead className="tax-header">
			<tr>
				<th className="text-left">Country</th>
				<th>Gross salary</th>
				<th>Net salary</th>
				<th>Taxes</th>
				<th>Tax percent</th>
				<th>Gross salary</th>
				<th>Net salary</th>
				<th>Gross salary (m)</th>
				<th>Net salary (m)</th>
				<th>Hourly net salary</th>
			</tr>
		</thead>
	);
}

// Calculation functions
function getCalculator(
	defaultCurrency: string,
	displayCurrency: string,
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

		const tax_percentage = result.taxes / amount;
		const salary_per_hour_after_tax =
			result.after_tax / (options.workdaysPerYear * options.hoursPerDay);

		const base: CalculationResultInCurrency = {
			salaryGross: amount,
			salaryNet: result.after_tax,
			taxes: result.taxes,
			hourlyRateNet: salary_per_hour_after_tax,
		};

		return {
			country: system.country,
			taxPercent: tax_percentage,
			base,
			local: convertCalculationResultInCurrency(
				base,
				defaultCurrency,
				system.currency,
				rates
			),
			preferred: convertCalculationResultInCurrency(
				base,
				defaultCurrency,
				displayCurrency,
				rates
			),
		};
	};
}

interface CalculationResultInCurrency {
	salaryGross: number;
	salaryNet: number;
	taxes: number;
	hourlyRateNet: number;
}

function convertCalculationResultInCurrency(
	result: CalculationResultInCurrency,
	from_currency: string,
	to_currency: string,
	rates: CurrencyRates
): CalculationResultInCurrency {
	const converter = (value: number) =>
		convertToCurrency(value, rates.usd, from_currency, to_currency);

	return {
		salaryGross: converter(result.salaryGross),
		salaryNet: converter(result.salaryNet),
		taxes: converter(result.taxes),
		hourlyRateNet: converter(result.hourlyRateNet),
	};
}

interface CalculationResult {
	country: string;
	taxPercent: number;
	base: CalculationResultInCurrency;
	local: CalculationResultInCurrency;
	preferred: CalculationResultInCurrency;
}
