import React, { useMemo, useState } from 'react';
import { formatCurrency } from '../../utils/converters';
import { sum } from 'utils/math';
import mock from './budget_mock.json';
import AddLine from './AddLine';

interface State {
	income: Line[];
	expenses: Line[];
}

export interface Line {
	name: string;
	category: string;
	amount: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
type Action = { type: 'ADD INCOME'; line: Line };

type Reducer = (state: State, action: Action) => Promise<State>;

function reducer(state: State, action: Action): Promise<State> {
	switch (action.type) {
		case 'ADD INCOME':
			return Promise.resolve({
				...state,
				income: state.income.concat(action.line),
			});

		default:
			return Promise.resolve(state);
	}
}

const useAsyncReducer = (
	reducer: Reducer,
	initialState: State
): [State, (action: Action) => Promise<void>] => {
	const [state, setState] = useState<State>(initialState);

	const dispatch = async (action: Action) => {
		const result = reducer(state, action);

		// TODO: Handle error
		setState(await result);
	};

	return [state, dispatch];
};

function fetchInitialData(): State {
	// TODO: Implement proper storage
	return { ...mock };
}

const currency = 'GBP';

function useComputation(state: State, savePercent: number) {
	const totalIncome = useMemo(
		() => sum(...state.income.map(x => x.amount)),
		[state.income]
	);
	const totalExpenses = useMemo(
		() => sum(...state.expenses.map(x => x.amount)),
		[state.expenses]
	);
	const total = useMemo(
		() => totalIncome - totalExpenses,
		[totalIncome, totalExpenses]
	);
	const savings = totalIncome * (savePercent / 100);

	const remaining = total - savings;

	return {
		total,
		totalIncome,
		totalExpenses,
		savings,
		remaining,
	};
}

const Budget: React.FC = () => {
	const [state, dispatch] = useAsyncReducer(reducer, fetchInitialData());
	const [savePercent, setSavePercent] = useState<number>(0);
	const { total, savings, remaining } = useComputation(state, savePercent);

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
						onKeyPress={event => {
							if (!/\d|\./.test(event.key)) {
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

			<div className="mx-4 pb-8">
				<table className="w-full border-separate border-spacing-0 overflow-hidden rounded">
					<thead>
						<tr>
							<th></th>
							<th>Per month</th>
							<th>Per year</th>
						</tr>
					</thead>

					<Body title="Income" data={state.income} />
					<AddLine
						add={(line: Line) => dispatch({ type: 'ADD INCOME', line })}
					/>

					<Body title="Expenses" data={state.expenses} />

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
		</>
	);
};

export default Budget;

const MonthAndYearCells: React.FC<{ value: number }> = ({ value }) => (
	<>
		<td className="currency">{formatCurrency(value, currency)}</td>
		<td className="currency">{formatCurrency(12 * value, currency)}</td>
	</>
);

const Body: React.FC<{ title: string; data: Line[] }> = ({ title, data }) => {
	const total = useMemo(
		() => data.map(line => line.amount).reduce((acc, v) => acc + v, 0),
		[data]
	);

	return (
		<tbody>
			<tr>
				<th className="text-left">{title}</th>
			</tr>
			{data.map(line => (
				<tr key={line.name} className="px-8 odd:bg-slate-700">
					<td>{line.name}</td>
					<MonthAndYearCells value={line.amount} />
				</tr>
			))}
			<tr>
				<th>Total</th>
				<th className="currency">{formatCurrency(total, currency)}</th>
				<th className="currency">{formatCurrency(12 * total, currency)}</th>
			</tr>
		</tbody>
	);
};
