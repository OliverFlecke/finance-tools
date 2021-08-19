import React, { useCallback, useContext, useState } from 'react';
import { formatCurrency } from 'utils/converters';
import { sum } from 'utils/math';
import DeleteIcon from '../../icons/DeleteIcon';
import { Stock } from './models';
import { StockContext } from './state';
import StockLotsTable from './StockLotsTable';

interface StockRowProps {
	stock: Stock;
}

const StockRow: React.FC<StockRowProps> = ({ stock }: StockRowProps) => {
	const { dispatch } = useContext(StockContext);
	const totalShares = sum(...stock.lots.map((x) => x.shares));
	const avgPrice = sum(...stock.lots.map((x) => x.shares * x.price)) / totalShares;

	const [showLots, setShowLots] = useState(false);
	const deleteStock = useCallback(() => {
		dispatch({ type: 'DELETE_STOCK', symbol: stock.symbol });
	}, [dispatch, stock.symbol]);

	return (
		<>
			<tr className="w-full relative bg-coolGray-800">
				<td>{stock.symbol}</td>
				<td>{formatCurrency(stock.regularMarketPrice, stock.currency)}</td>
				<td>{formatCurrency(stock.regularMarketPrice * totalShares, stock.currency)}</td>
				<td>{totalShares}</td>
				<td>{formatCurrency(avgPrice, stock.currency)}</td>
				<td className="flex flex-row items-center">
					<span
						onClick={() => setShowLots((x) => !x)}
						className="underline hover:cursor-pointer w-16"
					>
						See lots
					</span>
					<div onClick={deleteStock} className="w-8 text-red-500 hover:cursor-pointer">
						<DeleteIcon />
					</div>
				</td>
			</tr>
			<tr>
				<td colSpan={6} className={`p-0 ${showLots ? '' : 'hidden'}`}>
					<StockLotsTable lots={stock.lots} stock={stock} dispatch={dispatch} />
				</td>
			</tr>
		</>
	);
};

export default StockRow;
