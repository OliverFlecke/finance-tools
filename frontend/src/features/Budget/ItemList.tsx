import clsx from "clsx";
import { Eraser, Plus } from "lucide-react";
import React, { useContext, useMemo, useState } from "react";
import { formatCurrency } from "utils/converters";
import { sum } from "utils/math";
import { Button } from "@/ui/Button/Button";
import AddLine from "./AddLine";
import type { AddItemToBudgetRequest, Item } from "./api";
import BudgetLineActions from "./BudgetLineActions";
import styles from "./ItemList.module.css";
import { currency } from "./index";
import MonthAndYearCells from "./MonthAndYearCells";
import { BudgetContext } from "./state";

interface Props {
	title: string;
	items: Item[];
	total: number;
	addItem: (item: AddItemToBudgetRequest) => void;
	deleteItem: (id: string) => void;
	updateItem: (id: string, item: AddItemToBudgetRequest) => void;
	variant?: "income" | "expenses";
}

export default function ItemList({ title, items, total, addItem, deleteItem, updateItem, variant }: Props) {
	const {
		state: { hideItems },
	} = useContext(BudgetContext);
	const groups = useMemo(() => Array.from(groupByCategory(items)), [items]);
	const [addVisible, setAddVisible] = useState(false);

	const bgClass =
		variant === "income"
			? styles.income_bg
			: variant === "expenses"
				? styles.expenses_bg
				: undefined;
	const oddClass =
		variant === "income"
			? styles.income_odd
			: variant === "expenses"
				? styles.expenses_odd
				: undefined;

	return (
		<>
			<tbody className={bgClass}>
				<tr>
					<th className={styles.section_title} colSpan={4}>
						{title}
					</th>
				</tr>
				{groups.map((group) => (
					<React.Fragment key={group.category}>
						<tr key={group.category} className={clsx(styles.category_row, hideItems && oddClass)}>
							<th className={styles.category_label}>{group.category}</th>
							<MonthAndYearCells value={Math.abs(sum(...group.items.map((x) => x.amount)))} />
							<td></td>
						</tr>
						{!hideItems &&
							group.items
								.sort((a, z) => a.amount - z.amount)
								.map((item) => (
									<tr key={item.name} className={clsx(styles.item_row, oddClass)}>
										<td className={styles.item_name}>{item.name}</td>
										<MonthAndYearCells value={Math.abs(item.amount)} />
										<BudgetLineActions
											item={item}
											deleteItem={deleteItem}
											updateItem={updateItem}
										/>
									</tr>
								))}
					</React.Fragment>
				))}
				<tr>
					<th className={styles.total_label}>Total</th>
					<th className="currency">{formatCurrency(total, currency)}</th>
					<th className="currency">{formatCurrency(12 * total, currency)}</th>
					<th className={styles.actions_header}>
						{addVisible ? (
							<Button onClick={() => setAddVisible(false)}>
								<Eraser />
							</Button>
						) : (
							<Button onClick={() => setAddVisible(true)}>
								<Plus />
							</Button>
						)}
					</th>
				</tr>
			</tbody>
			{addVisible && <AddLine add={addItem} />}
		</>
	);
}

/**
 * Helper function to group items by their category.
 */
function* groupByCategory(items: Item[]): Generator<{ category: string; items: Item[] }> {
	const groups = new Map();
	for (const item of items) {
		const group = groups.get(item.category) ?? [];
		group.push(item);
		groups.set(item.category, group);
	}
	for (const [category, items] of groups) {
		yield { category, items };
	}
}
