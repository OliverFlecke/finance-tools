import { Eraser, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/ui/Button/Button";
import AddLine from "./AddLine";
import type { AddItemToBudgetRequest, Item } from "./api";
import BudgetLineActions from "./BudgetLineActions";
import MonthAndYearCells from "./MonthAndYearCells";
import styles from "./SavingsList.module.css";

interface SavingsListProps {
	items: Item[];
	addItem: (item: AddItemToBudgetRequest) => void;
	deleteItem: (id: string) => void;
	updateItem: (id: string, item: AddItemToBudgetRequest) => void;
}

export default function SavingsList({ items, addItem, deleteItem, updateItem }: SavingsListProps) {
	const [addVisible, setAddVisible] = useState(false);

	const total = items.map((x) => x.amount).reduce((acc, value) => acc + value, 0);

	return (
		<>
			<tbody className={styles.container}>
				<tr>
					<td className={styles.title} colSpan={4}>
						Savings
					</td>
				</tr>
				{items.map((x) => (
					<tr key={x.id} className={styles.row}>
						<td className={styles.name}>{x.name}</td>
						<MonthAndYearCells value={x.amount} />
						<BudgetLineActions item={x} deleteItem={deleteItem} updateItem={updateItem} />
					</tr>
				))}

				<tr className={styles.total_row}>
					<td className={styles.total_label}>Total</td>
					<MonthAndYearCells value={total} />
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

			{addVisible && <AddLine add={addItem} category="Savings" />}
		</>
	);
}
