import React, { useCallback, useState } from 'react';
import DeleteButton from 'components/DeleteButton';
import { AddItemToBudgetRequest, Item } from './api';
import { IoCreateOutline } from 'react-icons/io5';
import EditItem from './EditItem';
import { Modal } from '@oliverflecke/components-react';

const BudgetLineActions: React.FC<{
	item: Item;
	deleteItem: (id: string) => void;
	updateItem: (id: string, item: AddItemToBudgetRequest) => void;
}> = ({ item, deleteItem, updateItem }) => {
	const [edit, setEdit] = useState(false);
	const update = useCallback(
		(id: string, item: AddItemToBudgetRequest) => {
			updateItem(id, item);
			setEdit(false);
		},
		[updateItem, setEdit],
	);

	return (
		<td className="flex flex-row justify-end space-x-2 pr-4">
			<DeleteButton onClick={() => deleteItem(item.id)} />
			<button
				onClick={() => setEdit(true)}
				className="text-green-700 dark:text-green-400"
			>
				<IoCreateOutline size={24} />
			</button>
			<Modal isOpen={edit} onDismiss={() => setEdit(false)}>
				<EditItem item={item} update={update} />
			</Modal>
		</td>
	);
};

export default BudgetLineActions;
