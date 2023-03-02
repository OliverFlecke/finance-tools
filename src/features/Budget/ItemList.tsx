import React, { useCallback, useMemo, useState } from 'react';
import DeleteButton from 'components/DeleteButton';
import { formatCurrency } from 'utils/converters';
import { AddItemToBudgetRequest, Item } from './api';
import { currency } from './index';
import MonthAndYearCells from './MonthAndYearCells';
import { sum } from 'utils/math';
import { IoCreateOutline } from 'react-icons/io5';
import EditItem from './EditItem';
import { Modal } from '@oliverflecke/components-react';

interface Props {
	title: string;
	items: Item[];
	total: number;
	deleteItem: (id: string) => void;
	updateItem: (id: string, item: AddItemToBudgetRequest) => void;
}

const ItemList: React.FC<Props> = ({
	title,
	items,
	total,
	deleteItem,
	updateItem,
}) => {
	const groups = useMemo(() => Array.from(groupByCategory(items)), [items]);

	return (
		<tbody>
			<tr>
				<th className="text-left">{title}</th>
			</tr>
			{groups.map(group => {
				return (
					<>
						<tr key={group.category} className="font-bold text-yellow-600">
							<th className="text-left">{group.category}</th>
							<MonthAndYearCells
								value={Math.abs(sum(...group.items.map(x => x.amount)))}
							/>
						</tr>
						{group.items.map(item => (
							<tr key={item.name} className="px-8 odd:bg-slate-700">
								<td>{item.name}</td>
								<MonthAndYearCells value={Math.abs(item.amount)} />
								<Actions
									item={item}
									deleteItem={deleteItem}
									updateItem={updateItem}
								/>
							</tr>
						))}
					</>
				);
			})}
			<tr>
				<th>Total</th>
				<th className="currency">{formatCurrency(total, currency)}</th>
				<th className="currency">{formatCurrency(12 * total, currency)}</th>
			</tr>
		</tbody>
	);
};

export default ItemList;

const Actions: React.FC<{
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
		[updateItem, setEdit]
	);

	return (
		<td className="flex flex-row justify-end space-x-2">
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

/**
 * Helper function to group items by their category.
 */
function* groupByCategory(
	items: Item[]
): Generator<{ category: string; items: Item[] }> {
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
