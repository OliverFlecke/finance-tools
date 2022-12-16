import ClientOnly from 'components/ClientOnly';
import useAsyncReducer from 'hooks/useAsyncReducer';
import React, { useState } from 'react';
import { getDataFromStorage } from 'utils/storage';
import AddLine from './AddLine';
import LineOverview from './LineOverview';
import MonthAndYearCells from './MonthAndYearCells';
import { useComputation } from './useComputation';

export interface State {
	income: Line[];
	expenses: Line[];
}

export interface Line {
	name: string;
	category: string;
	amount: number;
}

type Action =
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
	const { total, totalIncome, totalExpenses, savings, remaining } =
		useComputation(state, { savePercent });

	return (
		<>
			<h2 className="page-header">Budget</h2>

			<div className="mx-4">
				<h3 className="pt-4 text-xl">Configuration</h3>
				<label htmlFor="desired-savings">Desired savings</label>
				<span className="mx-4 rounded bg-gray-800 py-1 px-2 focus-within:ring-2">
					<input
						className="w-12 bg-transparent pr-2 text-right outline-none"
						placeholder="15"
						name="desired-savings"
						type="number"
						min="0"
						max="100"
						onKeyDown={event => {
							if (
								!/[0-9\.,\b]/.test(event.key) &&
								event.key !== 'Backspace' &&
								event.key !== 'Delete'
							) {
								event.preventDefault();
								return;
							}
						}}
						onChange={x =>
							setSavePercent(Number.parseFloat(x.currentTarget.value))
						}
					/>
					%
				</span>
			</div>

			<ClientOnly>
				<div className="mx-4 pb-8">
					<table className="w-full border-separate border-spacing-0 overflow-hidden rounded">
						<thead>
							<tr>
								<th></th>
								<th>Per month</th>
								<th>Per year</th>
							</tr>
						</thead>

						<LineOverview
							title="Income"
							data={state.income}
							total={totalIncome}
						/>
						<AddLine
							add={(line: Line) => dispatch({ type: 'ADD INCOME', line })}
						/>

						<LineOverview
							title="Expenses"
							data={state.expenses}
							total={totalExpenses}
						/>
						<AddLine
							add={(line: Line) => dispatch({ type: 'ADD EXPENSE', line })}
						/>

						<tfoot>
							<tr className="bg-green-400 dark:bg-green-700">
								<th>After monthley expenses</th>
								<MonthAndYearCells value={total} />
							</tr>
							<tr>
								<td>Savings</td>
								<MonthAndYearCells value={savings} />
							</tr>
							<tr className="bg-green-400 dark:bg-green-700">
								<th>Remaining</th>
								<MonthAndYearCells value={remaining} />
							</tr>
						</tfoot>
					</table>
				</div>
			</ClientOnly>
		</>
	);
};

export default Budget;
