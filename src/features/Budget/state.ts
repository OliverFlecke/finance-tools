import React from 'react';
import { getDataFromStorage } from 'utils/storage';
import { AddItemToBudgetRequest, BudgetWithItems, Item } from './api';

export const BudgetContext = React.createContext({
	state: fetchInitialData(),
	// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
	dispatch: (_: Action) => {},
});

export interface State {
	budget?: BudgetWithItems;
	hideItems: boolean;
}

export function fetchInitialData(): State {
	return getDataFromStorage('budget', { hideItems: false });
}

export type Action =
	| { type: 'HIDE ITEMS'; value: boolean }
	| { type: 'SET BUDGET'; budget: BudgetWithItems }
	| { type: 'REMOVE ITEM'; budget_id: string; item_id: string }
	| { type: 'EDIT ITEM'; item_id: string; item: AddItemToBudgetRequest }
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
	updateItemCallback: (
		budget_id: string,
		item_id: string,
		request: AddItemToBudgetRequest
	) => Promise<void>;
}

export function createReducer(
	options: ReducerOptions
): (state: State, action: Action) => Promise<State> {
	return async (state: State, action: Action) => {
		switch (action.type) {
			case 'HIDE ITEMS':
				return {
					...state,
					hideItems: action.value,
				};

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

				console.log(state.budget.items);
				console.log(state.budget.items.concat(item));

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
			case 'EDIT ITEM':
				if (!state.budget) {
					throw new Error('No budget has been selected');
				}

				await options.updateItemCallback(
					state.budget.id,
					action.item_id,
					action.item
				);

				return {
					...state,
					budget: {
						...state.budget,
						items: state.budget.items.map(x =>
							x.id === action.item_id
								? {
										...x,
										...action.item,
								  }
								: x
						),
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
