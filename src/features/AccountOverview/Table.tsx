import { AccountContext } from 'features/AccountOverview/AccountService';
import {
	Account,
	AccountEntries,
} from 'features/AccountOverview/models/Account';
import SettingsContext from 'features/Settings/context';
import React, { FC, useContext } from 'react';
import { getValueColorIndicator } from 'utils/colors';
import { convertToCurrency, formatCurrency } from 'utils/converters';
import DeleteButton from '../../components/DeleteButton';
import Cell from './Cell';

const Table: FC = () => {
	const {
		state: { accounts, entries },
	} = useContext(AccountContext);

	const totals = calculateTotals(accounts, entries);

	return (
		<div className="h-full overflow-x-auto pb-4 md:px-4">
			<table className="w-full">
				<TableHeader accounts={accounts} />
				<tbody>
					{Object.keys(entries).map((date, i) => {
						return (
							<tr
								key={date}
								className="whitespace-nowrap text-right font-mono odd:bg-gray-300 dark:odd:bg-gray-800"
							>
								<td className="pr-6 text-center">{date}</td>
								<RowSummary date={date} index={i} totals={totals} />
								{accounts.map(account => (
									<Cell
										key={account.name}
										account={account}
										entry={entries[date]}
										date={date}
									/>
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
		<tr className="whitespace-nowrap text-right">
			<th className="pr-6 text-center">Date</th>
			<th className="px-4 text-green-700 dark:text-green-500">Gain</th>
			<th className="px-4 text-blue-700 dark:text-blue-500">Total</th>
			<th className="px-4 text-yellow-700 dark:text-yellow-500">Total cash</th>
			<th className="px-4 text-purple-700 dark:text-purple-500">
				Total investments
			</th>
			{accounts.map(account => (
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
	const {
		values: { preferredDisplayCurrency },
	} = useContext(SettingsContext);

	const gain = index === 0 ? 0 : totals[index] - totals[index - 1];
	const total = totals[index];
	const totalCash = useSummarizedAccounts(
		accounts,
		entries,
		date,
		x => x.type === 'Cash'
	);
	const totalInvested = useSummarizedAccounts(
		accounts,
		entries,
		date,
		x => x.type === 'Investment'
	);

	return (
		<>
			<td className={getValueColorIndicator(gain)}>
				{formatCurrency(gain, preferredDisplayCurrency)}
			</td>
			<td className="px-4 text-blue-700 dark:text-blue-500">
				{formatCurrency(total, preferredDisplayCurrency)}
			</td>
			<td className="px-4 text-yellow-700 dark:text-yellow-500">
				{formatCurrency(totalCash, preferredDisplayCurrency)}
			</td>
			<td className="px-4 text-purple-700 dark:text-purple-500">
				{formatCurrency(totalInvested, preferredDisplayCurrency)}
			</td>
		</>
	);
};

const RowActions: FC<{ date: string }> = ({ date }) => {
	const { dispatch } = useContext(AccountContext);

	return (
		<td className="pl-4">
			<DeleteButton
				onClick={() => dispatch({ type: 'DELETE ENTRY', date: date })}
			/>
		</td>
	);
};

function calculateTotals(
	accounts: Account[],
	entries: AccountEntries
): number[] {
	return Object.keys(entries).map(date =>
		useSummarizedAccounts(accounts, entries, date)
	);
}

function useSummarizedAccounts(
	accounts: Account[],
	entries: AccountEntries,
	date: string,
	filter: (account: Account) => boolean = () => true
): number {
	const {
		values: { currencyRates, preferredDisplayCurrency },
	} = useContext(SettingsContext);

	return accounts
		.filter(filter)
		.map(account =>
			convertToCurrency(
				entries[date][account.name] ?? 0,
				currencyRates.usd,
				account.currency,
				preferredDisplayCurrency
			)
		)
		.reduce((sum, value) => sum + value, 0);
}
