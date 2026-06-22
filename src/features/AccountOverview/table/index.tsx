import { useAccountContext as useAccountContextLegacy } from "features/AccountOverview/AccountService";
import type { AccountEntries } from "features/AccountOverview/models/Account";
import type { Account } from "@/api/generated/dist";
import DeleteButton from "@/components/DeleteButton";
import { useAccountContext } from "../Context";
import Cell from "./Cell";
import styles from "./index.module.css";
import RowSummary from "./RowSummary";
import { useSummarizedAccounts } from "./useSummarizedAccounts";

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
						{accounts.map((account) => (
							<Cell key={account.id} account={account} entry={entries[date]} date={date} />
						))}
						<RowActions date={date} />
					</tr>
				);
			})}
		</>
	);
}

function RowActions({ date }: { date: string }) {
	const { dispatch } = useAccountContextLegacy(); // TODO: Needs to be replaced

	return (
		<td className="pl-4">
			<DeleteButton onClick={() => dispatch({ type: "DELETE ENTRY", date: date })} />
		</td>
	);
}

function calculateTotals(accounts: Account[], entries: AccountEntries): number[] {
	return Object.keys(entries).map((date) => useSummarizedAccounts(accounts, entries, date));
}
