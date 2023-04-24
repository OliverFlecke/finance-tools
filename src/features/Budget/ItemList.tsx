import React, { useCallback, useContext, useMemo, useState } from 'react';
import DeleteButton from 'components/DeleteButton';
import { formatCurrency } from 'utils/converters';
import { AddItemToBudgetRequest, Item } from './api';
import { currency } from './index';
import MonthAndYearCells from './MonthAndYearCells';
import { sum } from 'utils/math';
import { IoCreateOutline } from 'react-icons/io5';
import EditItem from './EditItem';
import { Modal } from '@oliverflecke/components-react';
import { BudgetContext } from './state';
import AddButton from '../../components/button/AddButton';
import AddLine from './AddLine';
import RemoveButton from '../../components/button/RemoveButton';

interface Props {
	title: string;
	items: Item[];
	total: number;
	addItem: (item: AddItemToBudgetRequest) => void;
	deleteItem: (id: string) => void;
	updateItem: (id: string, item: AddItemToBudgetRequest) => void;
}

const ItemList: React.FC<Props> = ({
	title,
	items,
	total,
	addItem,
	deleteItem,
	updateItem,
}) => {
	const {
		state: { hideItems },
	} = useContext(BudgetContext);
	const groups = useMemo(() => Array.from(groupByCategory(items)), [items]);
	const [addVisible, setAddVisible] = useState(false);

	return (
		<>
			<tbody>
				<tr>
					<th className="text-left text-xl underline">{title}</th>
				</tr>
				{groups.map(group => (
					<React.Fragment key={group.category}>
						<tr
							key={group.category}
							className={`font-bold text-fuchsia-700 dark:text-fuchsia-500 ${
								hideItems ? 'odd:bg-slate-200 dark:odd:bg-slate-700' : ''
							}`}
						>
							<th className="px-4 text-left">{group.category}</th>
							<MonthAndYearCells
								value={Math.abs(sum(...group.items.map(x => x.amount)))}
							/>
							<td></td>
						</tr>
						{!hideItems &&
							group.items.map(item => (
								<tr
									key={item.name}
									className="px-8 odd:bg-slate-200 dark:odd:bg-slate-700"
								>
									<td className="pl-8">{item.name}</td>
									<MonthAndYearCells value={Math.abs(item.amount)} />
									<Actions
										item={item}
										deleteItem={deleteItem}
										updateItem={updateItem}
									/>
								</tr>
							))}
					</React.Fragment>
				))}
				<tr>
					<th className="text-left">Total</th>
					<th className="currency">{formatCurrency(total, currency)}</th>
					<th className="currency">{formatCurrency(12 * total, currency)}</th>
					<th className="flex flex-row justify-end pr-4">
						{addVisible ? (
							<RemoveButton onClick={() => setAddVisible(false)} />
						) : (
							<AddButton onClick={() => setAddVisible(true)} />
						)}
					</th>
				</tr>
			</tbody>
			{addVisible && <AddLine add={addItem} />}
		</>
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
