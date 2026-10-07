import type React from "react";
import { type FC, useCallback, useContext, useState } from "react";
import { Dialog } from "@/ui/Dialog/Dialog";
import AddButton from "../../components/button/AddButton";
import DeleteButton from "../../components/DeleteButton";
import {
	type Budget,
	useDeleteBudgetCallback,
	useFetchAllBudgets,
	useFetchBudgetWithItemsCallback,
} from "./api";
import BudgetCreate from "./BudgetCreate";
import styles from "./BudgetList.module.css";
import { BudgetContext } from "./state";

const BudgetList: React.FC = () => {
	const { dispatch } = useContext(BudgetContext);

	const budgets = useFetchAllBudgets();
	const deleteCallback = useDeleteBudgetCallback();
	const fetchBudgetWithItems = useFetchBudgetWithItemsCallback();

	const onSelectBudget = useCallback(
		async (budget: Budget) => {
			const b = await fetchBudgetWithItems(budget.id);
			if (b) {
				dispatch({ type: "SET BUDGET", budget: b });
			}
		},
		[dispatch, fetchBudgetWithItems],
	);
	const onDelete = useCallback(
		async (id: string) => {
			await deleteCallback(id);
			budgets.refresh();
		},
		[budgets, deleteCallback],
	);

	const [isCreateOpen, setIsCreateOpen] = useState(false);

	return (
		<div className={styles.container}>
			<div className={styles.header_row}>
				<span>Title</span>
				<span>Created at</span>
				<span></span>
			</div>
			{budgets.data && (
				<ul>
					{budgets.data?.map((b) => (
						<BudgetListItem
							key={`${b.title}-${b.created_at.toISOString()}`}
							budget={b}
							deleteCallback={onDelete}
							onSelect={onSelectBudget}
						/>
					))}
				</ul>
			)}
			<div className={styles.footer_row}>
				<AddButton onClick={() => setIsCreateOpen(true)} />
			</div>
			<Dialog open={isCreateOpen} onClose={() => setIsCreateOpen(false)}>
				<BudgetCreate onBudgetCreated={budgets.refresh} />
			</Dialog>
		</div>
	);
};

export default BudgetList;

const BudgetListItem: FC<{
	budget: Budget;
	onSelect: (budget: Budget) => void;
	deleteCallback: (id: string) => void;
}> = ({ budget, deleteCallback, onSelect }) => (
	<li className={styles.item}>
		<button type="button" onClick={() => onSelect(budget)} className={styles.select_button}>
			{budget.title}
		</button>
		<span>{budget.created_at.toDateString()}</span>
		<span>
			<DeleteButton onClick={() => deleteCallback(budget.id)} />
		</span>
	</li>
);
