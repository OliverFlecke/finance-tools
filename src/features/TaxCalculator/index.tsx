import SettingsContext from 'features/Settings/context';
import React, { useContext } from 'react';
import { convertToCurrency, useConverter } from 'utils/converters';
import taxCalculator, { constants, TaxSystem } from './taxRates';

const TaxCalculator: React.FC = () => {
	const {
		values: { currencyRates: rates, preferredDisplayCurrency: defaultCurrency },
	} = useContext(SettingsContext);
	const salary = 500_000;

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

	function calculateAndPrintTaxResults(amount: number, system: TaxSystem) {
		let result = system.calculate(amount);

		if (defaultCurrency !== system.currency) {
			// eslint-disable-next-line react-hooks/rules-of-hooks
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
	}

	const countries = Object.keys(taxCalculator).sort();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const salaries = countries.reduce((obj: any, key) => {
		obj[key] = convertToCurrency(salary, rates.usd, defaultCurrency, taxCalculator[key].currency);
		return obj;
	}, {});

	return (
		<div className="overflow-x-auto">
			<table className="w-full">
				<TableHeader columns={columns} />
				<tbody>
					{countries.map(country => {
						const result: { [key: string]: string } = calculateAndPrintTaxResults(
							salaries[country],
							taxCalculator[country]
						);
						return (
							<tr key={country}>
								{columns.map(c => (
									<td key={c} className="text-right">
										{result[c]}
									</td>
								))}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default TaxCalculator;

const TableHeader: React.FC<{ columns: string[] }> = ({ columns }) => (
	<thead>
		{columns.map(c => (
			<th key={c} className="whitespace-nowrap px-4 font-bold text-gray-700 dark:text-gray-400">
				{c}
			</th>
		))}
	</thead>
);
