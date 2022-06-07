import SettingsContext from 'features/Settings/context';
import React, { useContext, useReducer } from 'react';
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
		<div className="h-full min-h-screen bg-gray-800">
			<TaxCalculatorContext.Provider value={{ state, dispatch }}>
				<TaxCalculatorInput />
				<TaxTable />
			</TaxCalculatorContext.Provider>
		</div>
	);
};

export default TaxCalculator;
