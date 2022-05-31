import React, { useReducer } from 'react';
import { getDefaultState, TaxCalculatorContext, taxCalculatorReducer } from './state';
import TaxCalculatorInput from './TaxCalculatorInput';
import TaxTable from './TaxTable';

const TaxCalculator: React.FC = () => {
	const [state, dispatch] = useReducer(taxCalculatorReducer, getDefaultState());

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
