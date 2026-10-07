import type React from "react";
import { useState } from "react";
import AddButton from "../../components/button/AddButton";
import RemoveButton from "../../components/button/RemoveButton";
import AddLine from "./AddLine";
import type { AddItemToBudgetRequest, Item } from "./api";
import BudgetLineActions from "./BudgetLineActions";
import MonthAndYearCells from "./MonthAndYearCells";
import styles from "./SavingsList.module.css";

const SavingsList: React.FC<{
	items: Item[];
	addItem: (item: AddItemToBudgetRequest) => void;
	deleteItem: (id: string) => void;
	updateItem: (id: string, item: AddItemToBudgetRequest) => void;
}> = ({ items, addItem, deleteItem, updateItem }) => {
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
							<RemoveButton onClick={() => setAddVisible(false)} />
						) : (
							<AddButton onClick={() => setAddVisible(true)} />
						)}
					</th>
				</tr>
			</tbody>

			{addVisible && <AddLine add={addItem} category="Savings" />}
		</>
	);
};

export default SavingsList;
