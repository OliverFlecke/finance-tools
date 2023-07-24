import SelectCurrency from 'components/SelectCurrency';
import SettingsContext from 'features/Settings/context';
import React, { useCallback, useContext } from 'react';
import { NumericFormat } from 'react-number-format';
import { TaxCalculatorContext } from './state';
import { convertToCurrency, formatCurrency } from '../../utils/converters';

export default function TaxCalculatorInput() {
	const { values } = useContext(SettingsContext);
	const { state, dispatch } = useContext(TaxCalculatorContext);

	const onCurrencyChanged = useCallback(
		(currency: string) => dispatch({ type: 'SET CURRENCY', currency }),
		[dispatch],
	);

	return (
		<div className="flex space-x-4 p-4">
			<label className="flex flex-col space-y-2">
				<span className="input-label">Income</span>
				<NumericFormat
					inputMode="numeric"
					placeholder="100,000"
					className="rounded-md bg-white py-2 px-4 shadow focus:border-indigo-400 focus:outline-none focus:ring dark:bg-gray-900 dark:text-gray-100"
					defaultValue={state.salary}
					thousandSeparator={true}
					onValueChange={e =>
						dispatch({ type: 'SET SALARY', salary: e.floatValue ?? 0 })
					}
				/>
			</label>
			<SelectCurrency
				label="Currency"
				onChange={onCurrencyChanged}
				defaultCurrency={values.preferredDisplayCurrency}
			/>
			<SalaryInPreferredCurrency
				salary={state.salary}
				currency={state.currency}
			/>
		</div>
	);
}
interface SalaryInPreferredCurrencyProps {
	salary?: number;
	currency: string;
}

function SalaryInPreferredCurrency({
	salary,
	currency,
}: SalaryInPreferredCurrencyProps) {
	const {
		values: { preferredDisplayCurrency, currencyRates },
	} = useContext(SettingsContext);
	if (!salary) return null;

	const value = convertToCurrency(
		salary,
		currencyRates.usd,
		currency,
		preferredDisplayCurrency,
	);

	return (
		<div className="flex h-full flex-col space-y-2">
			<label className="input-label">Income in preferred currency</label>
			<span className="py-1 text-yellow-700 dark:text-yellow-400">
				{formatCurrency(value, preferredDisplayCurrency, {
					maximumFractionDigits: 0,
				})}
			</span>
		</div>
	);
}
