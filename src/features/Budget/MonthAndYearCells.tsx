import React from 'react';
import { formatCurrency } from '../../utils/converters';
import { currency } from './index';

const MonthAndYearCells: React.FC<{ value: number }> = ({ value }) => (
	<>
		<td className="currency">{formatCurrency(value, currency)}</td>
		<td className="currency">{formatCurrency(12 * value, currency)}</td>
	</>
);

export default MonthAndYearCells;
