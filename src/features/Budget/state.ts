import { AddItemToBudgetRequest, BudgetWithItems, Item } from './api';

export interface State {
	budget?: BudgetWithItems;
}

export type Action =
	| { type: 'SET BUDGET'; budget: BudgetWithItems }
	| { type: 'REMOVE ITEM'; budget_id: string; item_id: string }
	| { type: 'ADD INCOME'; budget_id: string; item: AddItemToBudgetRequest }
	| { type: 'ADD EXPENSE'; budget_id: string; item: AddItemToBudgetRequest };

interface ReducerOptions {
	addItemToBudgetCallback: (
		budget_id: string,
		request: AddItemToBudgetRequest
	) => Promise<string>;
	deleteItemFromBudgetCallback: (
		budget_id: string,
		item_id: string
	) => Promise<void>;
}

export function createReducer(
	options: ReducerOptions
): (state: State, action: Action) => Promise<State> {
	return async (state: State, action: Action) => {
		switch (action.type) {
			case 'ADD EXPENSE':
			case 'ADD INCOME':
				if (!state.budget) {
					throw new Error('No budget has been selected');
				}

				const item_id = await options.addItemToBudgetCallback(
					action.budget_id,
					action.item
				);
				const now = new Date(Date.now());
				const item: Item = {
					...action.item,
					created_at: now,
					modified_at: now,
					id: item_id,
					budget_id: action.budget_id,
				};

				return {
					...state,
					budget: {
						...state.budget,
						items: state.budget.items.concat(item),
					},
				};
			case 'REMOVE ITEM':
				if (!state.budget) {
					throw new Error('No budget has been selected');
				}

				await options.deleteItemFromBudgetCallback(
					action.budget_id,
					action.item_id
				);

				return {
					...state,
					budget: {
						...state.budget,
						items: state.budget.items.filter(x => x.id !== action.item_id),
					},
				};

			case 'SET BUDGET':
				return {
					...state,
					budget: action.budget,
				};

			default:
				console.warn(`Unhandled action: ${action}`);
				return Promise.resolve(state);
		}
	};
}
