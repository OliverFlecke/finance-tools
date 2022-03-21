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
			income: new Category({
				currencyRates,
				currency: data.currency,
				...data.income,
			}),
			expense: new Category({
				currencyRates,
				currency: data.currency,
				...data.expense,
			}),
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

type BudgetAction = { type: 'REMOVE_CATEGORY'; category: Category };

export function reducer(state: BudgetState, action: BudgetAction): BudgetState {
	switch (action.type) {
		case 'REMOVE_CATEGORY':
			return {
				...state,
				income: state.income.removeChild(action.category),
				expense: state.expense.removeChild(action.category),
			};

		default:
			return state;
	}
}
