import React, { useMemo, useState } from 'react';
import { formatCurrency } from '../../utils/converters';
import { sum } from 'utils/math';
import mock from './budget_mock.json';

interface State {
	income: Line[];
	expenses: Line[];
}

interface Line {
	name: string;
	category: string;
	amount: number;
}

function loadData(): State {
	// TODO: Implement proper storage
	return { ...mock };
}

const currency = 'GBP';

const Budget: React.FC = () => {
	const { income, expenses } = loadData();
	const totalIncome = sum(...income.map(x => x.amount));
	const totalExpenses = sum(...expenses.map(x => x.amount));
	const total = totalIncome - totalExpenses;

	const [savePercent, setSavePercent] = useState<number>(0);
	const savings = totalIncome * (savePercent / 100);

	const remaining = total - savings;

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

					<Body title="Income" data={income} />
					<Body title="Expenses" data={expenses} />

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
