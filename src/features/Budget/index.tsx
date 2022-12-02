import React, { useMemo } from 'react';
import { formatCurrency } from '../../utils/converters';
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

const Budget: React.FC = () => {
	const { income, expenses } = loadData();

	return (
		<>
			<h2 className="page-header">Budget</h2>

			<div className="mx-4">
				<table className="w-full">
					<thead>
						<tr>
							<th></th>
							<th>Per month</th>
							<th>Per year</th>
						</tr>
					</thead>

					<Body title="Income" data={income} />
					<Body title="Expenses" data={expenses} />
				</table>
			</div>
		</>
	);
};

export default Budget;

const currency = 'GBP';

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
				<tr key={line.name} className="mx-2 odd:bg-slate-700">
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
