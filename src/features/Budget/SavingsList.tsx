import React, { useState } from 'react';
import { AddItemToBudgetRequest, Item } from './api';
import MonthAndYearCells from './MonthAndYearCells';
import RemoveButton from '../../components/button/RemoveButton';
import AddButton from '../../components/button/AddButton';
import AddLine from './AddLine';
import BudgetLineActions from './BudgetLineActions';

const SavingsList: React.FC<{
	items: Item[];
	addItem: (item: AddItemToBudgetRequest) => void;
	deleteItem: (id: string) => void;
	updateItem: (id: string, item: AddItemToBudgetRequest) => void;
}> = ({ items, addItem, deleteItem, updateItem }) => {
	const [addVisible, setAddVisible] = useState(false);

	const total = items.map(x => x.amount).reduce((acc, value) => acc + value, 0);

	return (
		<>
			<tbody className="bg-blue-100 dark:bg-blue-900">
				<tr>
					<td className="px-4 text-left text-xl underline" colSpan={4}>
						Savings
					</td>
				</tr>
				{items.map(x => (
					<tr key={x.id} className="odd:bg-blue-200 dark:odd:bg-blue-800">
						<td className="pl-8 text-fuchsia-700  dark:text-fuchsia-500 ">
							{x.name}
						</td>
						<MonthAndYearCells value={x.amount} />
						<BudgetLineActions
							item={x}
							deleteItem={deleteItem}
							updateItem={updateItem}
						/>
					</tr>
				))}

				<tr className="font-bold">
					<td className="px-4">Total</td>
					<MonthAndYearCells value={total} />
					<th className="flex flex-row justify-end pr-4">
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
