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

const TaxTable: React.FC = () => {
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
};

export default TaxTable;

interface TableBodyProps {
	countries: string[];
	calculator: (amount: number, system: TaxSystem) => CalculationResult;
}

const formatOptions = {
	maximumFractionDigits: 0,
};

const TableBody: React.FC<TableBodyProps> = ({ countries, calculator }) => {
	const {
		values: { currencyRates, preferredDisplayCurrency },
	} = useContext(SettingsContext);
	const {
		state: { salary, currency },
	} = useContext(TaxCalculatorContext);

	if (!salary) return null;

	return (
		<tbody>
			{countries.map(country => {
				const localCurrency = taxCalculator[country].currency;
				const localSalary = convertToCurrency(
					salary,
					currencyRates.usd,
					currency,
					localCurrency
				);
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const result = calculator(localSalary, taxCalculator[country]);

				return (
					<tr key={country} className="tax-row">
						<td>{result.country}</td>
						<td>
							{formatCurrency(
								result.local.salaryGross,
								localCurrency,
								formatOptions
							)}
						</td>
						<td className="text-green-700 dark:text-green-400">
							{formatCurrency(
								result.preferred.salaryNet,
								preferredDisplayCurrency,
								formatOptions
							)}
						</td>
						<td className="text-red-700 dark:text-red-400">
							{formatCurrency(
								result.preferred.taxes,
								preferredDisplayCurrency,
								formatOptions
							)}
						</td>
						<td>
							{result.taxPercent.toLocaleString(undefined, {
								style: 'percent',
							})}
						</td>
						<td>
							{formatCurrency(
								result.local.salaryNet,
								localCurrency,
								formatOptions
							)}
						</td>
						<td>
							{formatCurrency(
								result.local.salaryGross / 12,
								localCurrency,
								formatOptions
							)}
						</td>
						<td>
							{formatCurrency(
								result.local.salaryNet / 12,
								localCurrency,
								formatOptions
							)}
						</td>
						<td>
							{formatCurrency(
								result.base.hourlyRateNet,
								currency,
								formatOptions
							)}
						</td>
					</tr>
				);
			})}
		</tbody>
	);
};

const TableHeader: React.FC = () => {
	return (
		<thead className="tax-header">
			<tr>
				<th className="text-left">Country</th>
				<th>Local gross salary</th>
				<th>Net salary</th>
				<th>Taxes</th>
				<th>Tax percent</th>
				<th>Local net salary</th>
				<th>Local net salary (monthly)</th>
				<th>Hourly net salary</th>
			</tr>
		</thead>
	);
};

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
