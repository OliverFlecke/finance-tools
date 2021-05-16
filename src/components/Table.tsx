import React, { FC } from 'react';
import { Account, AccountEntries } from '../models/Account';
import Cell from './Cell';

interface TableProps {
	accounts: Account[];
	entries: AccountEntries;
}

const Table: FC<TableProps> = ({ accounts, entries }: TableProps) => {
	console.log(accounts);

	return (
		<table className="w-full">
			<thead>
				<tr>
					<th>Date</th>
					{accounts.map((account) => (
						<th key={account.name}>
							<span>{account.name}</span>
						</th>
					))}
				</tr>
			</thead>
			<tbody className="">
				{Object.keys(entries).map((date) => (
					<tr key={date} className="odd:bg-gray-300 dark:odd:bg-gray-900">
						<td>{date}</td>
						{accounts.map((account) => (
							<Cell key={account.name} account={account} entry={entries[date]} />
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Table;
