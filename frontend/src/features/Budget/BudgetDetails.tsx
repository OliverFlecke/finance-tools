import clsx from "clsx";
import { useCallback, useContext, useMemo } from "react";
import { getBackgroundColorValueIndicator } from "utils/colors";
import { sum } from "../../utils/math";
import type { AddItemToBudgetRequest, BudgetWithItems } from "./api";
import styles from "./BudgetDetails.module.css";
import ItemList from "./ItemList";
import MonthAndYearCells from "./MonthAndYearCells";
import SavingsList from "./SavingsList";
import { BudgetContext } from "./state";

export default function BudgetDetails({ budget }: { budget: BudgetWithItems }) {
	const { income, expenses, total, totalIncome, totalExpenses, savings, totalSavings, remaining } =
		useComputation(budget);

	const { deleteItem, updateItem, addItem, addExpense, addSavings } = useHandlers(budget.id);

	return (
		<div className={styles.container}>
			<table className={styles.table}>
				<Header />

				<ItemList
					title="Income"
					items={income}
					total={totalIncome}
					addItem={addItem}
					deleteItem={deleteItem}
					updateItem={updateItem}
					variant="income"
				/>

				<ItemList
					title="Expenses"
					items={expenses}
					total={totalExpenses}
					addItem={addExpense}
					deleteItem={deleteItem}
					updateItem={updateItem}
					variant="expenses"
				/>

				<SavingsList
					items={savings}
					addItem={addSavings}
					deleteItem={deleteItem}
					updateItem={updateItem}
				/>

				<Footer
					totalIncome={totalIncome}
					total={total}
					savings={totalSavings}
					remaining={remaining}
				/>
			</table>
		</div>
	);
}

interface FooterProps {
	totalIncome: number;
	total: number;
	savings: number;
	remaining: number;
}

function Footer({ totalIncome, total, savings, remaining }: FooterProps) {
	return (
		<tfoot className={styles.panel_bg}>
			<tr className={getBackgroundColorValueIndicator(total)}>
				<th className={styles.label_top}>After monthley expenses</th>
				<MonthAndYearCells value={total} />
				<td></td>
			</tr>
			<tr>
				<td className={styles.label_mid}>Savings</td>
				<MonthAndYearCells value={savings} />
				<td className={styles.percentage_cell}>{(100 * (savings / totalIncome)).toFixed(2)} %</td>
			</tr>
			<tr className={clsx(styles.remaining_row, getBackgroundColorValueIndicator(remaining))}>
				<th className={styles.label_bottom}>Remaining</th>
				<MonthAndYearCells value={remaining} />
				<td></td>
			</tr>
		</tfoot>
	);
}

function Header() {
	return (
		<thead className={styles.panel_bg}>
			<tr className={styles.header_row}>
				<th className={styles.header_cell}></th>
				<th className={styles.header_cell}>Per month</th>
				<th className={styles.header_cell}>Per year</th>
				<th></th>
			</tr>
		</thead>
	);
}

function useHandlers(budgetId: string) {
	const { dispatch } = useContext(BudgetContext);

	const deleteItem = useCallback(
		(item_id: string) => {
			dispatch({ type: "REMOVE ITEM", budget_id: budgetId, item_id });
		},
		[budgetId, dispatch],
	);
	const updateItem = useCallback(
		(item_id: string, item: AddItemToBudgetRequest) => {
			dispatch({ type: "EDIT ITEM", item_id, item });
		},
		[dispatch],
	);
	const addItem = useCallback(
		(item: AddItemToBudgetRequest) =>
			dispatch({
				type: "ADD INCOME",
				budget_id: budgetId,
				item,
			}),
		[budgetId, dispatch],
	);
	const addExpense = useCallback(
		(item: AddItemToBudgetRequest) => {
			item.amount = -item.amount;
			dispatch({
				type: "ADD EXPENSE",
				budget_id: budgetId,
				item,
			});
		},
		[budgetId, dispatch],
	);

	const addSavings = useCallback(
		(item: AddItemToBudgetRequest) => {
			dispatch({
				type: "ADD SAVINGS",
				budget_id: budgetId,
				item,
			});
		},
		[budgetId, dispatch],
	);

	return {
		deleteItem,
		updateItem,
		addItem,
		addExpense,
		addSavings,
	};
}

function useComputation(budget: BudgetWithItems) {
	const income = useMemo(
		() => budget.items.filter((x) => x.amount >= 0).filter((x) => x.category !== "Savings"),
		[budget.items],
	);
	const expenses = useMemo(() => budget.items.filter((x) => x.amount < 0), [budget.items]);
	const savings = useMemo(
		() => budget.items.filter((x) => x.category === "Savings"),
		[budget.items],
	);

	const totalIncome = useMemo(() => sum(...income.map((x) => x.amount)), [income]);
	const totalExpenses = useMemo(() => -sum(...expenses.map((x) => x.amount)), [expenses]);
	const total = useMemo(() => totalIncome - totalExpenses, [totalIncome, totalExpenses]);

	const totalSavings = useMemo(
		() => savings.reduce((acc, item) => acc + item.amount, 0),
		[savings],
	);
	const remaining = total - totalSavings;

	return {
		income,
		expenses,
		savings,
		total,
		totalIncome,
		totalExpenses,
		totalSavings,
		remaining,
	};
}
