import { storedReducer } from 'utils/storage';
import TaxCalculatorAction from './actions';
import { storageKey, TaxCalculatorState } from './index';

function reducer(state: TaxCalculatorState, action: TaxCalculatorAction): TaxCalculatorState {
	switch (action.type) {
		case 'SET SALARY':
			return {
				...state,
				salary: action.salary,
			};
		case 'SET CURRENCY':
			return {
				...state,
				currency: action.currency,
			};
		default:
			console.warn(`Unhandled state: ${action}`);
			return state;
	}
}

export default storedReducer(storageKey, reducer);
