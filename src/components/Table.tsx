import React, { FC, useContext } from 'react';
import DeleteIcon from '../icons/DeleteIcon';
import { Account, AccountEntries } from '../models/Account';
import { AccountContext } from '../services/AccountService';
import { currencyFormatter } from '../utils/converters';
import Cell from './Cell';

interface TableProps {
	accounts: Account[];
	entries: AccountEntries;
}

const Table: FC<TableProps> = ({ accounts, entries }: TableProps) => {
	const { dispatch } = useContext(AccountContext);

	return (
		<div className="h-full overflow-x-auto">
			<table className="w-full">
				<thead>
					<tr className="text-right whitespace-nowrap">
						<th className="text-center">Date</th>
						<th className="text-blue-700">Total</th>
						<th className="text-green-700">Total cash</th>
						<th className="text-purple-700">Total investments</th>
						{accounts.map((account) => (
							<th key={account.name}>
								<span>{account.name}</span>
							</th>
						))}
						<th></th>
					</tr>
				</thead>
				<tbody>
					{Object.keys(entries).map((date) => {
						const total = filterAndSum(accounts, entries, date);
						const totalCash = filterAndSum(accounts, entries, date, (x) => x.type === 'Cash');
						const totalInvested = filterAndSum(
							accounts,
							entries,
							date,
							(x) => x.type === 'Investment'
						);

						return (
							<tr
								key={date}
								className="odd:bg-gray-300 dark:odd:bg-warmGray-800 text-right whitespace-nowrap font-mono"
							>
								<td className="text-center">{date}</td>
								<td className="text-blue-700">{currencyFormatter.format(total)}</td>
								<td className="text-green-500">{currencyFormatter.format(totalCash)}</td>
								<td className="text-purple-700">{currencyFormatter.format(totalInvested)}</td>
								{accounts.map((account) => (
									<Cell key={account.name} account={account} entry={entries[date]} date={date} />
								))}
								<td>
									<button
										onClick={() => dispatch({ type: 'delete entry', date: date })}
										className="flex h-6 w-6 text-red-700 dark:text-red-500 focus:outline-none"
									>
										<DeleteIcon />
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Table;

function filterAndSum(
	accounts: Account[],
	entries: AccountEntries,
	date: string,
	filter: (account: Account) => boolean = (_) => true
): number {
	return accounts
		.filter(filter)
		.map((x) => entries[date][x.name] ?? 0)
		.reduce((acc, x) => acc + x, 0);
}
