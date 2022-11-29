import React from 'react';
import mock from './budget_mock.json';

interface State {
	income: Line[];
	expenses: Line[];
}

interface Line {
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

			<table className="mx-4 w-full">
				<thead>
					<th></th>
					<th>Per month</th>
					<th>Per year</th>
				</thead>

				<Body title="Income" data={income} />
				<Body title="Expenses" data={expenses} />
			</table>
		</>
	);
};

export default Budget;

const Body: React.FC<{ title: string; data: Line[] }> = ({ title, data }) => (
	<tbody>
		<tr>
			<th className="text-left">{title}</th>
		</tr>
		{data.map(line => (
			<tr key={line.category} className="odd:bg-slate-700">
				<td>{line.category}</td>
				<td>{line.amount}</td>
				<td>{12 * line.amount}</td>
			</tr>
		))}
	</tbody>
);
