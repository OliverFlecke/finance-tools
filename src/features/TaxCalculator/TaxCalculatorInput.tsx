import SelectCurrency from 'components/SelectCurrency';
import SettingsContext from 'features/Settings/context';
import React, { useCallback, useContext } from 'react';
import NumberFormat from 'react-number-format';
import { TaxCalculatorContext } from './state';

const TaxCalculatorInput: React.FC = () => {
	const { values } = useContext(SettingsContext);
	const { state, dispatch } = useContext(TaxCalculatorContext);

	const onCurrencyChanged = useCallback(
		(currency: string) => dispatch({ type: 'SET CURRENCY', currency }),
		[dispatch]
	);

	return (
		<div className="flex space-x-4 p-4">
			<label className="flex flex-col space-y-2">
				<span className="input-label">Income</span>
				<NumberFormat
					inputMode="numeric"
					placeholder="100,000"
					className="rounded-md bg-white  py-2 px-4 shadow focus:border-indigo-400 focus:outline-none focus:ring dark:bg-gray-900 dark:text-gray-100"
					defaultValue={state.salary}
					thousandSeparator={true}
					onValueChange={e => dispatch({ type: 'SET SALARY', salary: e.floatValue ?? 0 })}
				/>
			</label>
			<SelectCurrency
				label="Currency"
				onChange={onCurrencyChanged}
				defaultCurrency={values.preferredDisplayCurrency}
			/>
		</div>
	);
};

export default TaxCalculatorInput;
