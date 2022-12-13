import React from 'react';
import { formatCurrency } from '../../utils/converters';
import { Line, currency } from './index';
import MonthAndYearCells from './MonthAndYearCells';

interface Props {
	title: string;
	data: Line[];
	total: number;
}

const LineOverview: React.FC<Props> = ({ title, data, total }) => {
	return (
		<tbody>
			<tr>
				<th className="text-left">{title}</th>
			</tr>
			{data.map(line => (
				<tr key={line.name} className="px-8 odd:bg-slate-700">
					<td>{line.name}</td>
					<MonthAndYearCells value={line.amount} />
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

export default LineOverview;
