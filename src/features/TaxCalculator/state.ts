import { storedReducer } from 'utils/storage';
import { makeContext } from '../../utils/flux';

const storageKey = 'tax_calculator_state';

export interface TaxCalculatorState {
	salary?: number;
}

export function getDefaultState(): TaxCalculatorState {
	return {};
}

export const TaxCalculatorContext = makeContext<TaxCalculatorState, TaxCalculatorAction>(
	getDefaultState
);

export type TaxCalculatorAction = { type: 'SET SALARY'; salary: number };

function reducer(state: TaxCalculatorState, action: TaxCalculatorAction): TaxCalculatorState {
	switch (action.type) {
		case 'SET SALARY':
			return {
				...state,
				salary: action.salary,
			};
		default:
			console.warn(`Unhandled state: ${action.type}`);
			return state;
	}
}

export function taxCalculatorReducer(
	state: TaxCalculatorState,
	action: TaxCalculatorAction
): TaxCalculatorState {
	return storedReducer(storageKey, reducer)(state, action);
}
