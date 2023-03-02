import React from 'react';
import DeleteButton from 'components/DeleteButton';
import { formatCurrency } from 'utils/converters';
import { Item } from './api';
import { currency } from './index';
import MonthAndYearCells from './MonthAndYearCells';
import { sum } from 'utils/math';

interface Props {
	title: string;
	items: Item[];
	total: number;
	deleteItem: (id: string) => void;
}

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

const ItemList: React.FC<Props> = ({ title, items, total, deleteItem }) => {
	const groups = Array.from(groupByCategory(items));

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
								<td>
									<Actions item={item} deleteItem={deleteItem} />
								</td>
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

const Actions: React.FC<{ item: Item; deleteItem: (id: string) => void }> = ({
	item,
	deleteItem,
}) => {
	return (
		<>
			<DeleteButton onClick={() => deleteItem(item.id)} />
		</>
	);
};
