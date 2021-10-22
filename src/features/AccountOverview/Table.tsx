import { Account, AccountEntries } from 'features/AccountOverview/models/Account';
import React, { FC, useContext } from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import { AccountContext } from 'features/AccountOverview/AccountService';
import { currencyFormatter } from 'utils/converters';
import Cell from './Cell';

interface TableProps {
	accounts: Account[];
	entries: AccountEntries;
}

const Table: FC<TableProps> = ({ accounts, entries }: TableProps) => {
	const { dispatch } = useContext(AccountContext);
	const totals = Object.keys(entries).map((date) => filterAndSum(accounts, entries, date));

	return (
		<div className="h-full overflow-x-auto pb-4">
			<table className="w-full">
				<thead>
					<tr className="text-right whitespace-nowrap">
						<th className="text-center">Date</th>
						<th className="text-green-700 dark:text-green-500">Gain</th>
						<th className="text-blue-700 dark:text-blue-500">Total</th>
						<th className="text-yellow-700 dark:text-yellow-500">Total cash</th>
						<th className="text-purple-700 dark:text-purple-500">Total investments</th>
						{accounts.map((account) => (
							<th key={account.name}>
								<span>{account.name}</span>
							</th>
						))}
						<th></th>
					</tr>
				</thead>
				<tbody>
					{Object.keys(entries).map((date, i) => {
						const gain = i === 0 ? 0 : totals[i] - totals[i - 1];
						const total = totals[i];
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
								className="odd:bg-gray-300 dark:odd:bg-coolGray-800 text-right whitespace-nowrap font-mono"
							>
								<td className="text-center">{date}</td>
								<td className="text-green-700 dark:text-green-500">
									{currencyFormatter.format(gain)}
								</td>
								<td className="text-blue-700 dark:text-blue-500">
									{currencyFormatter.format(total)}
								</td>
								<td className="text-yellow-700 dark:text-yellow-500">
									{currencyFormatter.format(totalCash)}
								</td>
								<td className="text-purple-700 dark:text-purple-500">
									{currencyFormatter.format(totalInvested)}
								</td>
								{accounts.map((account) => (
									<Cell key={account.name} account={account} entry={entries[date]} date={date} />
								))}
								<td>
									<button
										onClick={() => dispatch({ type: 'DELETE ENTRY', date: date })}
										className="flex  focus:outline-none"
									>
										<IoTrashOutline size={24} className="text-red-700 dark:text-red-500" />
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
	filter: (account: Account) => boolean = () => true
): number {
	return accounts
		.filter(filter)
		.map((x) => entries[date][x.name] ?? 0)
		.reduce((acc, x) => acc + x, 0);
}
