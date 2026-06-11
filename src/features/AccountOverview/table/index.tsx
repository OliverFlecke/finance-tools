import { useAccountContext } from "features/AccountOverview/AccountService";
import { Account, AccountEntries } from "features/AccountOverview/models/Account";
import DeleteButton from "@/components/DeleteButton";
import Cell from "./Cell";
import styles from "./index.module.css";
import RowSummary from "./RowSummary";
import { useSummarizedAccounts } from "./useSummarizedAccounts";

export default function Table() {
	const {
		state: { accounts },
	} = useAccountContext();

	return (
		<div className={styles.container}>
			<table className="w-full">
				<thead>
					<TableHeader accounts={accounts} />
				</thead>
				<tbody>
					<TableBody />
				</tbody>
			</table>
		</div>
	);
}

interface TableHeaderProps {
	accounts: Account[];
}

function TableHeader({ accounts }: Readonly<TableHeaderProps>) {
	return (
		<tr className="whitespace-nowrap text-right">
			<th className="pr-6 text-center">Date</th>
			<th className="px-4 text-green-700 dark:text-green-500">Gain</th>
			<th className="px-4 text-blue-700 dark:text-blue-500">Total</th>
			<th className="px-4 text-yellow-700 dark:text-yellow-500">Total cash</th>
			<th className="px-4 text-purple-700 dark:text-purple-500">Total investments</th>
			{accounts.map((account) => (
				<th key={account.name} className="px-4">
					<span>{account.name}</span>
				</th>
			))}
			<th></th>
		</tr>
	);
}

function TableBody() {
	const {
		state: { accounts, entries },
	} = useAccountContext();

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
							<Cell key={account.name} account={account} entry={entries[date]} date={date} />
						))}
						<RowActions date={date} />
					</tr>
				);
			})}
		</>
	);
}

function RowActions({ date }: { date: string }) {
	const { dispatch } = useAccountContext();

	return (
		<td className="pl-4">
			<DeleteButton onClick={() => dispatch({ type: "DELETE ENTRY", date: date })} />
		</td>
	);
}

function calculateTotals(accounts: Account[], entries: AccountEntries): number[] {
	return Object.keys(entries).map((date) => useSummarizedAccounts(accounts, entries, date));
}
