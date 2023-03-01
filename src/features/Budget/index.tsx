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
import BudgetCreate from './BudgetCreate';
import BudgetDetails from './BudgetDetails';
import BudgetList from './BudgetList';

export interface State {
	budget?: BudgetWithItems;
}

export interface Line {
	name: string;
	category: string;
	amount: number;
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
	return getDataFromStorage('budget', {});
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

			<BudgetCreate />
			<BudgetList setBudget={setBudget} />

			<ClientOnly>
				{state.budget && (
					<>
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
