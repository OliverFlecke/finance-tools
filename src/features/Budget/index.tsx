import ClientOnly from 'components/ClientOnly';
import useAsyncReducer from 'hooks/useAsyncReducer';
import React, { useMemo, useState } from 'react';
import {
	useAddItemToBudgetCallback,
	useDeleteItemCallback,
	useUpdateItemCallback,
} from './api';
import Configuration from './BudgetConfiguration';
import BudgetDetails from './BudgetDetails';
import BudgetList from './BudgetList';
import {
	Action,
	BudgetContext,
	createReducer,
	fetchInitialData,
	State,
} from './state';

// TODO: This should be part of the settings for a budget
export const currency = 'GBP';

const Wrapper: React.FC = () => {
	const addItemToBudgetCallback = useAddItemToBudgetCallback();
	const deleteItemFromBudgetCallback = useDeleteItemCallback();
	const updateItemCallback = useUpdateItemCallback();

	const reducer = useMemo(
		() =>
			createReducer({
				addItemToBudgetCallback,
				deleteItemFromBudgetCallback,
				updateItemCallback,
			}),
		[addItemToBudgetCallback, deleteItemFromBudgetCallback, updateItemCallback]
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
	// TODO: This should be a per budget setting
	const [savePercent, setSavePercent] = useState<number>(0);

	return (
		<>
			<h2 className="page-header">Budget</h2>

			<BudgetContext.Provider value={{ state, dispatch }}>
				<BudgetList />

				<ClientOnly>
					{state.budget && (
						<>
							<h3 className="px-4 pt-6 text-3xl text-orange-700 dark:text-orange-500">
								{state.budget.title}
							</h3>
							<Configuration setSavePercent={setSavePercent} />
							<BudgetDetails budget={state.budget} savePercent={savePercent} />
						</>
					)}
				</ClientOnly>
			</BudgetContext.Provider>
		</>
	);
};

export default Wrapper;
