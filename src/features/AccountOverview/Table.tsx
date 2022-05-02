import { AccountContext } from 'features/AccountOverview/AccountService';
import { Account, AccountEntries } from 'features/AccountOverview/models/Account';
import React, { FC, useContext } from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import { currencyFormatter } from 'utils/converters';
import { getValueColorIndicator } from '../../utils/colors';
import Cell from './Cell';

const Table: FC = () => {
	const {
		state: { accounts, entries },
	} = useContext(AccountContext);

	const totals = Object.keys(entries).map((date) => filterAndSum(accounts, entries, date));

	return (
		<div className="h-full overflow-x-auto pb-4">
			<table className="w-full">
				<TableHeader accounts={accounts} />
				<tbody>
					{Object.keys(entries).map((date, i) => {
						return (
							<tr
								key={date}
								className="odd:bg-gray-300 dark:odd:bg-gray-800 text-right whitespace-nowrap font-mono"
							>
								<td className="text-center pr-6">{date}</td>
								<RowSummary date={date} index={i} totals={totals} />
								{accounts.map((account) => (
									<Cell key={account.name} account={account} entry={entries[date]} date={date} />
								))}
								<RowActions date={date} />
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Table;

const TableHeader = ({ accounts }: { accounts: Account[] }) => (
	<thead>
		<tr className="text-right whitespace-nowrap">
			<th className="text-center pr-6">Date</th>
			<th className="text-green-700 dark:text-green-500 px-4">Gain</th>
			<th className="text-blue-700 dark:text-blue-500 px-4">Total</th>
			<th className="text-yellow-700 dark:text-yellow-500 px-4">Total cash</th>
			<th className="text-purple-700 dark:text-purple-500 px-4">Total investments</th>
			{accounts.map((account) => (
				<th key={account.name} className="px-4">
					<span>{account.name}</span>
				</th>
			))}
			<th></th>
		</tr>
	</thead>
);

const RowSummary: FC<{
	index: number;
	date: string;
	totals: number[];
}> = ({ index, date, totals }) => {
	const {
		state: { accounts, entries },
	} = useContext(AccountContext);

	const gain = index === 0 ? 0 : totals[index] - totals[index - 1];
	const total = totals[index];
	const totalCash = filterAndSum(accounts, entries, date, (x) => x.type === 'Cash');
	const totalInvested = filterAndSum(accounts, entries, date, (x) => x.type === 'Investment');

	return (
		<>
			<td className={getValueColorIndicator(gain)}>{currencyFormatter.format(gain)}</td>
			<td className="text-blue-700 dark:text-blue-500 px-4">{currencyFormatter.format(total)}</td>
			<td className="text-yellow-700 dark:text-yellow-500 px-4">
				{currencyFormatter.format(totalCash)}
			</td>
			<td className="text-purple-700 dark:text-purple-500 px-4">
				{currencyFormatter.format(totalInvested)}
			</td>
		</>
	);
};

const RowActions: FC<{ date: string }> = ({ date }) => {
	const { dispatch } = useContext(AccountContext);

	return (
		<td className="pl-4">
			<button
				onClick={() => dispatch({ type: 'DELETE ENTRY', date: date })}
				className="flex focus:outline-none"
			>
				<IoTrashOutline size={24} className="text-red-700 dark:text-red-500" />
			</button>
		</td>
	);
};

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
