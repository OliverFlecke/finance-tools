import React, { FC } from 'react';
import { Account, DateEntry } from '../models/Account';
import Cell from './Cell';

const Table: FC = () => {
	return (
		<table className="w-full">
			<thead>
				<tr>
					<th>Date</th>
					{accounts.map((account) => (
						<th key={account.name}>{account.name}</th>
					))}
				</tr>
			</thead>
			<tbody className="">
				{Object.keys(entries).map((date) => (
					<tr key={date} className="odd:bg-indigo-900">
						<td>{date}</td>
						{accounts.map((account) => (
							<Cell
								key={account.name}
								account={account}
								entry={entries[date]}
							/>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Table;

const accounts: Account[] = [
	{
		name: 'Primary',
		type: 'Cash',
	},
	{
		name: 'Savings',
		type: 'Cash',
	},
	{
		name: 'Investments',
		type: 'Investment',
	},
];

const entries: { [x: string]: DateEntry } = {
	'2021-03-01': {
		Primary: 50,
		Savings: 100,
		Investments: 500,
	},
	'2021-04-01': {
		Primary: 100,
		Savings: 300,
	},
	'2021-05-01': {
		Primary: 200,
		Savings: 400,
	},
};
