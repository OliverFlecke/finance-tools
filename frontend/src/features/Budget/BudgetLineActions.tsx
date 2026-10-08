import { SquarePen, Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "@/ui/Button/Button";
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
			<Button onClick={() => deleteItem(item.id)} icon variant="Danger">
				<Trash />
			</Button>

			<Button onClick={() => setEdit(true)} icon>
				<SquarePen />
			</Button>

			<Dialog title="Edit" open={edit} onClose={() => setEdit(false)}>
				<EditItem item={item} update={update} />
			</Dialog>
		</td>
	);
}
