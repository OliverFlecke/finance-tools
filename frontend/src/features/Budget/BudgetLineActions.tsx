import DeleteButton from "components/DeleteButton";
import { useState } from "react";
import { IoCreateOutline } from "react-icons/io5";
import { Dialog } from "@/ui/Dialog/Dialog";
import type { AddItemToBudgetRequest, Item } from "./api";
import styles from "./BudgetLineActions.module.css";
import EditItem from "./EditItem";

interface Props {
	item: Item;
	deleteItem: (id: string) => void;
	updateItem: (id: string, item: AddItemToBudgetRequest) => void;
}

export default function BudgetLineActions({ item, deleteItem, updateItem }: Readonly<Props>) {
	const [edit, setEdit] = useState(false);
	const update = (id: string, item: AddItemToBudgetRequest) => {
		updateItem(id, item);
		setEdit(false);
	};

	return (
		<td className={styles.cell}>
			<DeleteButton onClick={() => deleteItem(item.id)} />

			<button type="button" onClick={() => setEdit(true)} className={styles.edit_button}>
				<IoCreateOutline size={24} />
			</button>

			<Dialog open={edit} onClose={() => setEdit(false)}>
				<EditItem item={item} update={update} />
			</Dialog>
		</td>
	);
}
