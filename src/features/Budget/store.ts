import { createContext } from 'react';
import { CurrencyRates } from '../../API/currency';
import { Category } from './category';
import data from './uk.json';

interface BudgetState {
	currency: string;
	income: Category;
	expense: Category;
}

export const BudgetContext = createContext<{
	state: BudgetState;
	dispatch: React.Dispatch<BudgetAction>;
}>({} as never);

export function initState(currencyRates: CurrencyRates): BudgetState {
	if (data) {
		return {
			...data,
			income: new Category(
				{ currency: data.currency, ...data.income },
				currencyRates
			),
			expense: new Category(
				{ currency: data.currency, ...data.expense },
				currencyRates
			),
		};
	}

	return {
		currency: 'USD',
		income: new Category({
			name: 'Total income',
		}),
		expense: new Category({
			name: 'Total expenses',
		}),
	};
}

type BudgetAction = { type: 'remove category'; name: string; parent: Category };

export function reducer(state: BudgetState, action: BudgetAction): BudgetState {
	switch (action.type) {
		case 'remove category':
			return state;

		default:
			return state;
	}
}
