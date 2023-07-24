import ClientOnly from 'components/ClientOnly';
import useAsyncReducer from 'hooks/useAsyncReducer';
import React, { useMemo } from 'react';
import Configuration from './BudgetConfiguration';
import BudgetDetails from './BudgetDetails';
import BudgetList from './BudgetList';
import {
	useAddItemToBudgetCallback,
	useDeleteItemCallback,
	useUpdateItemCallback,
} from './api';
import {
	Action,
	BudgetContext,
	State,
	createReducer,
	fetchInitialData,
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
		[addItemToBudgetCallback, deleteItemFromBudgetCallback, updateItemCallback],
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
		'budget',
	);

	return (
		<>
			<BudgetContext.Provider value={{ state, dispatch }}>
				<BudgetList />

				<ClientOnly>
					{state.budget && (
						<>
							<h3 className=" px-4 pt-6 text-3xl text-fuchsia-700 dark:text-fuchsia-600">
								{state.budget.title}
							</h3>
							<Configuration />
							<BudgetDetails budget={state.budget} />
						</>
					)}
				</ClientOnly>
			</BudgetContext.Provider>
		</>
	);
};

export default Wrapper;
