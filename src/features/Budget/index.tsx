import ClientOnly from 'components/ClientOnly';
import useAsyncReducer from 'hooks/useAsyncReducer';
import React, { useCallback, useMemo, useState } from 'react';
import { getDataFromStorage } from 'utils/storage';
import {
	BudgetWithItems,
	useAddItemToBudgetCallback,
	useDeleteItemCallback,
} from './api';
import Configuration from './BudgetConfiguration';
import BudgetDetails from './BudgetDetails';
import BudgetList from './BudgetList';
import { State, createReducer, Action } from './state';

function fetchInitialData(): State {
	return getDataFromStorage('budget', {});
}

// TODO: This should be part of the settings for a budget
export const currency = 'GBP';

const Wrapper: React.FC = () => {
	const addItemToBudgetCallback = useAddItemToBudgetCallback();
	const deleteItemFromBudgetCallback = useDeleteItemCallback();

	const reducer = useMemo(
		() =>
			createReducer({ addItemToBudgetCallback, deleteItemFromBudgetCallback }),
		[addItemToBudgetCallback, deleteItemFromBudgetCallback]
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
