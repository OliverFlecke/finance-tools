import React, { useMemo } from 'react';
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

	return (
		<>
			<h2 className="page-header">Budget</h2>

			<div className="mx-4">
				<table className="w-full border-separate border-spacing-0">
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
						<tr className="bg-green-700">
							<th>After monthley expenses</th>
							<th className="text-right">
								{formatCurrency(totalIncome - totalExpenses, currency)}
							</th>
							<th className="text-right">
								{formatCurrency(12 * (totalIncome - totalExpenses), currency)}
							</th>
						</tr>
					</tfoot>
				</table>
			</div>
		</>
	);
};

export default Budget;

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
					<td className="text-right">
						{formatCurrency(line.amount, currency)}
					</td>
					<td className="text-right">
						{formatCurrency(12 * line.amount, currency)}
					</td>
				</tr>
			))}
			<tr>
				<th>Total</th>
				<th className="text-right">{formatCurrency(total, currency)}</th>
				<th className="text-right">{formatCurrency(12 * total, currency)}</th>
			</tr>
		</tbody>
	);
};
