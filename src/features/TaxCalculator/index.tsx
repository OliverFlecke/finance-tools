import SettingsContext from 'features/Settings/context';
import React, { useContext, useReducer } from 'react';
import Guide from './Guide';
import { getDefaultState, TaxCalculatorContext } from './state';
import taxCalculatorReducer from './state/reducer';
import TaxCalculatorInput from './TaxCalculatorInput';
import TaxTable from './TaxTable';

const TaxCalculator: React.FC = () => {
	const { values } = useContext(SettingsContext);
	const [state, dispatch] = useReducer(taxCalculatorReducer, {
		...getDefaultState(),
		currency: values.preferredDisplayCurrency,
	});

	return (
		<div className="h-full min-h-screen bg-white dark:bg-gray-800">
			<h2 className="px-4 pt-4 text-2xl">Tax calculator</h2>

			<TaxCalculatorContext.Provider value={{ state, dispatch }}>
				<TaxCalculatorInput />
				<TaxTable />
			</TaxCalculatorContext.Provider>

			<Guide />
		</div>
	);
};

export default TaxCalculator;
