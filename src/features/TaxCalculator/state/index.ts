import { makeContext } from 'utils/flux';
import TaxCalculatorAction from './actions';

export const storageKey = 'tax_calculator_state';

export interface TaxCalculatorOptions {
	workdaysPerYear: number;
	hoursPerDay: number;
}

export interface TaxCalculatorState {
	salary?: number;
	currency: string;
	workOptions: TaxCalculatorOptions;
}

export function getDefaultState(): TaxCalculatorState {
	return {
		currency: 'USD',
		workOptions: {
			workdaysPerYear: 260,
			hoursPerDay: 8,
		},
	};
}

export const TaxCalculatorContext = makeContext<
	TaxCalculatorState,
	TaxCalculatorAction
>(getDefaultState);
