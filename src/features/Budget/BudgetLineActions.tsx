import { Modal } from '@oliverflecke/components-react'
import DeleteButton from 'components/DeleteButton'
import { useState } from 'react'
import { IoCreateOutline } from 'react-icons/io5'
import { AddItemToBudgetRequest, Item } from './api'
import EditItem from './EditItem'

interface Props {
	item: Item
	deleteItem: (id: string) => void
	updateItem: (id: string, item: AddItemToBudgetRequest) => void
}

export default function BudgetLineActions({ item, deleteItem, updateItem }: Readonly<Props>) {
	const [edit, setEdit] = useState(false)
	const update = (id: string, item: AddItemToBudgetRequest) => {
		updateItem(id, item)
		setEdit(false)
	}

	return (
		<td className="flex flex-row justify-end space-x-2 pr-4">
			<DeleteButton onClick={() => deleteItem(item.id)} />

			<button onClick={() => setEdit(true)} className="text-green-700 dark:text-green-400">
				<IoCreateOutline size={24} />
			</button>

			<Modal isOpen={edit} onDismiss={() => setEdit(false)}>
				<EditItem item={item} update={update} />
			</Modal>
		</td>
	)
}
