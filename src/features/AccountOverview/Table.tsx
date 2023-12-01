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
		state: { accounts },
	} = useContext(AccountContext);

	return (
		<div className="account-table">
			<table className="w-full">
				<thead>
					<TableHeader accounts={accounts} />
				</thead>
				<tbody>
					<TableBody />
					<TableBody />
				</tbody>
				<tfoot>
					<TableHeader accounts={accounts} />
				</tfoot>
			</table>
		</div>
	);
};

export default Table;

const TableHeader: React.FC<{ accounts: Account[] }> = ({ accounts }) => (
	<>
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
	</>
);

const TableBody: React.FC = () => {
	const {
		state: { accounts, entries },
	} = useContext(AccountContext);

	const totals = calculateTotals(accounts, entries);

	return (
		<>
			{Object.keys(entries).map((date, i) => {
				return (
					<tr
						key={date}
						style={{ height: 26 }}
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
		</>
	);
};

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
		x => x.type === 'Cash',
	);
	const totalInvested = useSummarizedAccounts(
		accounts,
		entries,
		date,
		x => x.type === 'Investment',
	);

	return (
		<>
			<td className={`${getValueColorIndicator(gain)} cell-summary`}>
				{formatCurrency(gain, preferredDisplayCurrency)}
				<SummaryInOtherCurrencies value={gain} index={index} />
			</td>
			<td className="text-blue-700 dark:text-blue-500 cell-summary">
				{formatCurrency(total, preferredDisplayCurrency)}
				<SummaryInOtherCurrencies value={total} index={index} />
			</td>
			<td className="text-yellow-700 dark:text-yellow-500 cell-summary">
				{formatCurrency(totalCash, preferredDisplayCurrency)}
				<SummaryInOtherCurrencies value={totalCash} index={index} />
			</td>
			<td className="text-purple-700 dark:text-purple-500 cell-summary">
				{formatCurrency(totalInvested, preferredDisplayCurrency)}
				<SummaryInOtherCurrencies value={totalInvested} index={index} />
			</td>
		</>
	);
};

/**
 * Displays the value in a list with the value converted to all preferred currencies.
 */
const SummaryInOtherCurrencies: FC<{ value: number; index: number }> = ({
	value,
	index,
}) => {
	const {
		values: { preferredDisplayCurrency, preferredCurrencies, currencyRates },
	} = useContext(SettingsContext);

	return (
		<ol style={{ top: -index * preferredCurrencies.length }}>
			{preferredCurrencies.map(code => (
				<li key={code}>
					{formatCurrency(
						convertToCurrency(
							value,
							currencyRates.usd,
							preferredDisplayCurrency,
							code,
						),
						code,
					)}
				</li>
			))}
		</ol>
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
	entries: AccountEntries,
): number[] {
	return Object.keys(entries).map(date =>
		useSummarizedAccounts(accounts, entries, date),
	);
}

function useSummarizedAccounts(
	accounts: Account[],
	entries: AccountEntries,
	date: string,
	filter: (account: Account) => boolean = () => true,
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
				preferredDisplayCurrency,
			),
		)
		.reduce((sum, value) => sum + value, 0);
}
