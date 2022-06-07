import { makeContext } from 'utils/flux';
import TaxCalculatorAction from './actions';

export const storageKey = 'tax_calculator_state';

export interface TaxCalculatorState {
	salary?: number;
	currency: string;
}

export function getDefaultState(): TaxCalculatorState {
	return {
		currency: 'USD',
	};
}

export const TaxCalculatorContext = makeContext<TaxCalculatorState, TaxCalculatorAction>(
	getDefaultState
);
