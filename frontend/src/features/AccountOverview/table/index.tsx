import clsx from "clsx";
import type { AccountEntries } from "features/AccountOverview/models/Account";
import type { Account } from "@/api/generated/types.gen";
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
			<table className={styles.table}>
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
		<tr className={styles.row}>
			<th className={styles.date_cell}>Date</th>
			<th className={styles.gain_header}>Gain</th>
			<th className={styles.total_header}>Total</th>
			<th className={styles.cash_header}>Total cash</th>
			<th className={styles.investments_header}>Total investments</th>
			{accounts.map((account) => (
				<th key={account.id} className={styles.account_header}>
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
				className={clsx(styles.row, styles.row_body)}
			>
				<td className={styles.date_cell}>{formatDate(date)}</td>
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
		<td className={styles.actions_cell}>
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
