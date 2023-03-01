import React from 'react';
import DeleteButton from 'components/DeleteButton';
import { formatCurrency } from 'utils/converters';
import { Item } from './api';
import { currency } from './index';
import MonthAndYearCells from './MonthAndYearCells';

interface Props {
	title: string;
	items: Item[];
	total: number;
	deleteItem: (id: string) => void;
}

const ItemList: React.FC<Props> = ({ title, items, total, deleteItem }) => {
	return (
		<tbody>
			<tr>
				<th className="text-left">{title}</th>
			</tr>
			{items.map(item => (
				<tr key={item.name} className="px-8 odd:bg-slate-700">
					<td>{item.name}</td>
					<MonthAndYearCells value={item.amount} />
					<td>
						<DeleteButton onClick={() => deleteItem(item.id)} />
					</td>
				</tr>
			))}
			<tr>
				<th>Total</th>
				<th className="currency">{formatCurrency(total, currency)}</th>
				<th className="currency">{formatCurrency(12 * total, currency)}</th>
			</tr>
		</tbody>
	);
};

export default ItemList;
