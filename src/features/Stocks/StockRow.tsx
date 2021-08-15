import React from 'react';
import { useState } from 'react';
import { sum } from 'utils/math';
import { Stock } from './models';
import StockLotsTable from './StockLotsTable';

interface StockRowProps {
	stock: Stock;
}

const StockRow: React.FC<StockRowProps> = ({ stock }: StockRowProps) => {
	const totalShares = sum(...stock.lots.map((x) => x.shares));
	const avgPrice = sum(...stock.lots.map((x) => x.shares * x.price)) / totalShares;

	const [showLots, setShowLots] = useState(false);

	return (
		<>
			<tr className="w-full relative bg-coolGray-800">
				<td>{stock.symbol}</td>
				<td>{stock.currentValue}</td>
				<td>{stock.currentValue * totalShares}</td>
				<td>{totalShares}</td>
				<td>{avgPrice}</td>
				<td onClick={() => setShowLots((x) => !x)} className="btn underline hover:cursor-pointer">
					See lots
				</td>
			</tr>
			<tr>
				<td colSpan={6} className={`p-0 ${showLots ? '' : 'hidden'}`}>
					<StockLotsTable lots={stock.lots} stock={stock} />
				</td>
			</tr>
		</>
	);
};

export default StockRow;
