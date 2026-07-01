import type { AccountEntries } from "features/AccountOverview/models/Account";
import type { Account } from "@/api/generated/dist";
import DeleteButton from "@/components/DeleteButton";
import { useAccountContext } from "@/features/AccountOverview/Context";
import { useSettingsContext } from "@/features/Settings/context";
import { formatDate } from "@/utils/date";
import Cell from "./Cell";
import styles from "./index.module.css";
import RowSummary from "./RowSummary";
import { summarizedAccounts } from "./useSummarizedAccounts";

export default function Table() {
	return (
		<div className={styles.container}>
			<table className="w-full">
				<thead>
					<TableHeader />
				</thead>
				<tbody>
					<TableBody />
				</tbody>
			</table>
		</div>
	);
}

function TableHeader() {
	const { accounts } = useAccountContext();

	return (
		<tr className="whitespace-nowrap text-right">
			<th className="pr-6 text-center">Date</th>
			<th className="px-4 text-green-700 dark:text-green-500">Gain</th>
			<th className="px-4 text-blue-700 dark:text-blue-500">Total</th>
			<th className="px-4 text-yellow-700 dark:text-yellow-500">Total cash</th>
			<th className="px-4 text-purple-700 dark:text-purple-500">Total investments</th>
			{accounts.map((account) => (
				<th key={account.id} className="px-4">
					<span>{account.name}</span>
				</th>
			))}
			<th></th>
		</tr>
	);
}

function TableBody() {
	const { accounts, entries } = useAccountContext();
	const totals = useTotals(accounts, entries);

	return Object.keys(entries)
		.map((date) => new Date(Date.parse(date)))
		.map((date, i) => (
			<tr
				key={date.toISOString()}
				style={{ height: 26 }}
				className="whitespace-nowrap text-right font-mono odd:bg-gray-300 dark:odd:bg-gray-800"
			>
				<td className="pr-6 text-center">{formatDate(date)}</td>
				<RowSummary date={date} index={i} totals={totals} />
				{accounts.map((account) => (
					<Cell key={account.id} account={account} entry={entries[formatDate(date)]} date={date} />
				))}
				<RowActions date={date} />
			</tr>
		));
}

function RowActions(_: { date: Date }) {
	// TODO: Add option to delete an entry
	return (
		<td className="pl-4">
			<DeleteButton onClick={() => {}} />
		</td>
	);
}

function useTotals(accounts: Account[], entries: AccountEntries): number[] {
	const { values } = useSettingsContext();

	return Object.keys(entries)
		.map((date) => new Date(Date.parse(date)))
		.map((date) => summarizedAccounts(accounts, entries, date, values));
}
