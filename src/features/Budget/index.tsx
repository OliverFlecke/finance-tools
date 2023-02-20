import useAsyncReducer from 'hooks/useAsyncReducer';
import React, { useState } from 'react';
import { getDataFromStorage } from 'utils/storage';
import Configuration from './BudgetConfiguration';
import BudgetCreate from './BudgetCreate';
import BudgetDetails from './BudgetDetails';
import BudgetList from './BudgetList';

export interface State {
	income: Line[];
	expenses: Line[];
}

export interface Line {
	name: string;
	category: string;
	amount: number;
}

export type Action =
	| { type: 'ADD INCOME'; line: Line }
	| { type: 'ADD EXPENSE'; line: Line };

function reducer(state: State, action: Action): Promise<State> {
	switch (action.type) {
		// TODO: Send this along to some server
		case 'ADD INCOME':
			return Promise.resolve({
				...state,
				income: state.income.concat(action.line),
			});
		case 'ADD EXPENSE':
			return Promise.resolve({
				...state,
				expenses: state.expenses.concat(action.line),
			});

		default:
			return Promise.resolve(state);
	}
}

function fetchInitialData(): State {
	return getDataFromStorage('budget', { income: [], expenses: [] });
}

export const currency = 'GBP';

const Budget: React.FC = () => {
	const [state, dispatch] = useAsyncReducer(
		reducer,
		fetchInitialData(),
		'budget'
	);
	const [savePercent, setSavePercent] = useState<number>(0);

	return (
		<>
			<h2 className="page-header">Budget</h2>

			<BudgetCreate />
			<BudgetList />

			<Configuration setSavePercent={setSavePercent} />
			<BudgetDetails
				state={state}
				dispatch={dispatch}
				savePercent={savePercent}
			/>
		</>
	);
};

export default Budget;
