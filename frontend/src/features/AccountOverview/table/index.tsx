import clsx from "clsx";
import type { AccountEntries } from "features/AccountOverview/models/Account";
import { Trash } from "lucide-react";
import { useState } from "react";
import type { Account } from "@/api/generated/types.gen";
import { useAccountContext } from "@/features/AccountOverview/Context";
import EditAccountModal from "@/features/AccountOverview/EditAccountModal";
import { useSettingsContext } from "@/features/Settings/context";
import { Button } from "@/ui/Button/Button";
import { formatDate } from "@/utils/date";
import Cell from "./Cell";
import styles from "./index.module.css";
import RowSummary from "./RowSummary";
import { summarizedAccounts } from "./useSummarizedAccounts";

export default function Table() {
	const [editingAccount, setEditingAccount] = useState<Account | null>(null);

	return (
		<div className={styles.container}>
			<table className={styles.table}>
				<thead>
					<TableHeader onEditAccount={setEditingAccount} />
				</thead>
				<tbody>
					<TableBody />
				</tbody>
			</table>
			{editingAccount && (
				<EditAccountModal
					account={editingAccount}
					onClose={() => setEditingAccount(null)}
					open={true}
				/>
			)}
		</div>
	);
}

function TableHeader({ onEditAccount }: { onEditAccount: (account: Account) => void }) {
	const { accounts } = useAccountContext();

	return (
		<tr className={styles.row}>
			<th className={styles.date_cell}>Date</th>
			<th className={styles.gain_header}>Gain</th>
			<th className={styles.total_header}>Total</th>
			<th className={styles.cash_header}>Total cash</th>
			<th className={styles.investments_header}>Total investments</th>
			{accounts
				.filter((a) => !a.archived)
				.map((account) => (
					<th className={styles.account_header} key={account.id}>
						<button
							className={styles.account_header_button}
							onClick={() => onEditAccount(account)}
							type="button"
						>
							{account.name}
						</button>
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
				className={clsx(styles.row, styles.row_body)}
				key={date.toISOString()}
				style={{ height: 26 }}
			>
				<td className={styles.date_cell}>{formatDate(date)}</td>
				<RowSummary date={date} index={i} totals={totals} />
				{accounts
					.filter((a) => !a.archived)
					.map((account) => (
						<Cell
							account={account}
							date={date}
							entry={entries[formatDate(date)]}
							key={account.id}
						/>
					))}
				<RowActions date={date} />
			</tr>
		));
}

function RowActions(_: { date: Date }) {
	// TODO: Add option to delete an entry
	return (
		<td className={styles.actions_cell}>
			<Button icon variant="Danger">
				<Trash />
			</Button>
		</td>
	);
}

function useTotals(accounts: Account[], entries: AccountEntries): number[] {
	const { values } = useSettingsContext();

	return Object.keys(entries)
		.map((date) => new Date(Date.parse(date)))
		.map((date) => summarizedAccounts(accounts, entries, date, values));
}
