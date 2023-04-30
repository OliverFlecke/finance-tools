import React, { useContext, useMemo, useState } from 'react';
import { formatCurrency } from 'utils/converters';
import { AddItemToBudgetRequest, Item } from './api';
import { currency } from './index';
import MonthAndYearCells from './MonthAndYearCells';
import { sum } from 'utils/math';
import { BudgetContext } from './state';
import AddButton from '../../components/button/AddButton';
import AddLine from './AddLine';
import RemoveButton from '../../components/button/RemoveButton';
import BudgetLineActions from './BudgetLineActions';

interface Props {
	title: string;
	items: Item[];
	total: number;
	addItem: (item: AddItemToBudgetRequest) => void;
	deleteItem: (id: string) => void;
	updateItem: (id: string, item: AddItemToBudgetRequest) => void;
	primaryBackgroundColor?: string;
	oddRowBackgroundColor?: string;
}

const ItemList: React.FC<Props> = ({
	title,
	items,
	total,
	addItem,
	deleteItem,
	updateItem,
	primaryBackgroundColor,
	oddRowBackgroundColor,
}) => {
	const {
		state: { hideItems },
	} = useContext(BudgetContext);
	const groups = useMemo(() => Array.from(groupByCategory(items)), [items]);
	const [addVisible, setAddVisible] = useState(false);

	return (
		<>
			<tbody className={primaryBackgroundColor}>
				<tr>
					<th className="px-4 pt-2 text-left text-xl underline" colSpan={4}>
						{title}
					</th>
				</tr>
				{groups.map(group => (
					<React.Fragment key={group.category}>
						<tr
							key={group.category}
							className={`text-fuchsia-700 dark:text-fuchsia-500 ${
								hideItems ? oddRowBackgroundColor : ''
							}`}
						>
							<th className="px-8 text-left">{group.category}</th>
							<MonthAndYearCells
								value={Math.abs(sum(...group.items.map(x => x.amount)))}
							/>
							<td></td>
						</tr>
						{!hideItems &&
							group.items.map(item => (
								<tr key={item.name} className={`px-8 ${oddRowBackgroundColor}`}>
									<td className="pl-12">{item.name}</td>
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
					<th className="pl-4 pb-2 text-left">Total</th>
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
