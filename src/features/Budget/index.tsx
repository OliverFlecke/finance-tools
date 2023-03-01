import ClientOnly from 'components/ClientOnly';
import useAsyncReducer from 'hooks/useAsyncReducer';
import React, { useCallback, useMemo, useState } from 'react';
import { getDataFromStorage } from 'utils/storage';
import {
	AddItemToBudgetRequest,
	BudgetWithItems,
	Item,
	useAddItemToBudgetCallback,
} from './api';
import Configuration from './BudgetConfiguration';
import BudgetDetails from './BudgetDetails';
import BudgetList from './BudgetList';

export interface State {
	budgets: BudgetWithItems[];
	budget?: BudgetWithItems;
}

export type Action =
	| { type: 'SET BUDGET'; budget: BudgetWithItems }
	| { type: 'ADD INCOME'; budget_id: string; item: AddItemToBudgetRequest }
	| { type: 'ADD EXPENSE'; budget_id: string; item: AddItemToBudgetRequest };

function createReducer(options: {
	addItemToBudgetCallback: (
		budget_id: string,
		request: AddItemToBudgetRequest
	) => Promise<string>;
}): (state: State, action: Action) => Promise<State> {
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

function fetchInitialData(): State {
	return getDataFromStorage('budget', { budgets: [] });
}

export const currency = 'GBP';

const Wrapper: React.FC = () => {
	const addItemToBudgetCallback = useAddItemToBudgetCallback();

	const reducer = useMemo(
		() => createReducer({ addItemToBudgetCallback }),
		[addItemToBudgetCallback]
	);

	return <Budget reducer={reducer} />;
};

const Budget: React.FC<{
	reducer: (state: State, action: Action) => Promise<State>;
}> = ({ reducer }) => {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const [state, dispatch] = useAsyncReducer(
		reducer,
		fetchInitialData(),
		'budget'
	);
	const [savePercent, setSavePercent] = useState<number>(0);
	const setBudget = useCallback(
		async (budget: BudgetWithItems) => {
			dispatch({ type: 'SET BUDGET', budget });
		},
		[dispatch]
	);

	return (
		<>
			<h2 className="page-header">Budget</h2>

			<BudgetList setBudget={setBudget} />

			<ClientOnly>
				{state.budget && (
					<>
						<h3 className="px-4 pt-6 text-3xl text-orange-500">
							{state.budget.title}
						</h3>
						<Configuration setSavePercent={setSavePercent} />
						<BudgetDetails
							budget={state.budget}
							dispatch={dispatch}
							savePercent={savePercent}
						/>
					</>
				)}
			</ClientOnly>
		</>
	);
};

export default Wrapper;
