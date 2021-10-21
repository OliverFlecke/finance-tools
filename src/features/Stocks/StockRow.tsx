import React, { useCallback, useContext, useState } from 'react';
import { IoEllipsisHorizontalCircleOutline, IoTrashOutline } from 'react-icons/io5';
import { getValueColorIndicator } from 'utils/colors';
import { formatCurrency } from 'utils/converters';
import { Stock, stockAvgPrice, stockGain, stockTotalShares } from './models';
import { StockContext } from './state';
import StockLotsTable from './StockLotsTable';

interface StockRowProps {
	stock: Stock;
}

const StockRow: React.FC<StockRowProps> = ({ stock }: StockRowProps) => {
	const {
		state: { preferredCurrency, currencyRates },
	} = useContext(StockContext);
	const totalShares = stockTotalShares(stock);
	const avgPrice = stockAvgPrice(stock);
	const gain = stockGain(stock, preferredCurrency, currencyRates);

	const [showLots, setShowLots] = useState(false);

	return (
		<>
			<tr className="w-full relative text-right bg-coolGray-200 dark:bg-coolGray-800">
				<td className="text-left px-4">{stock.symbol}</td>
				<td>{formatCurrency(stock.regularMarketPrice, stock.currency)}</td>
				<td>{formatCurrency(stock.regularMarketPrice * totalShares, stock.currency)}</td>
				<td>{totalShares}</td>
				<td className={getValueColorIndicator(avgPrice)}>
					{formatCurrency(avgPrice, stock.currency)}
				</td>
				<td className={getValueColorIndicator(gain)}>{formatCurrency(gain, preferredCurrency)}</td>

				<StockRowActions stock={stock} setShowLots={setShowLots} />
			</tr>
			<tr>
				<td colSpan={6} className={`p-0 pb-4 ${showLots ? '' : 'hidden'}`}>
					<StockLotsTable lots={stock.lots} stock={stock} />
				</td>
			</tr>
		</>
	);
};

export default StockRow;

interface StockRowActionProps {
	stock: Stock;
	setShowLots: React.Dispatch<React.SetStateAction<boolean>>;
}

const StockRowActions = ({ stock, setShowLots }: StockRowActionProps) => {
	const { dispatch } = useContext(StockContext);

	const deleteStock = useCallback(() => {
		dispatch({ type: 'DELETE STOCK', symbol: stock.symbol });
	}, [dispatch, stock.symbol]);

	return (
		<td className="flex flex-row items-center space-x-2">
			<button onClick={() => setShowLots((x) => !x)} className="hover:cursor-pointer">
				<IoEllipsisHorizontalCircleOutline size={24} />
			</button>
			<button onClick={deleteStock} className="hover:cursor-pointer">
				<IoTrashOutline className="text-red-500" size={24} />
			</button>
		</td>
	);
};