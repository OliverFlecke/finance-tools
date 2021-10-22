import React, { useCallback, useContext, useState } from 'react';
import { IoEllipsisHorizontalCircleOutline, IoTrashOutline } from 'react-icons/io5';
import { getValueColorIndicator } from 'utils/colors';
import { formatCurrency, useConverter } from 'utils/converters';
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
	const currencyConverter = useConverter(stock.currency, preferredCurrency, currencyRates.usd);

	const totalShares = stockTotalShares(stock);
	const avgPrice = stockAvgPrice(stock);
	const buyMarketPrice = avgPrice * totalShares;
	const marketValue = stock.regularMarketPrice * totalShares;
	const gain = stockGain(stock, preferredCurrency, currencyRates);
	const gainPercentage = (marketValue / buyMarketPrice - 1) * 100;

	const [showLots, setShowLots] = useState(false);

	return (
		<>
			<tr className="w-full relative text-right bg-coolGray-200 dark:bg-coolGray-800">
				<td className="text-left px-4">{stock.symbol}</td>
				<td>{formatCurrency(stock.regularMarketPrice, stock.currency)}</td>
				<td>{formatCurrency(currencyConverter(marketValue), preferredCurrency)}</td>
				<td>{totalShares}</td>
				<td className={getValueColorIndicator(avgPrice)}>
					{formatCurrency(avgPrice, stock.currency)}
				</td>
				<td className={`${getValueColorIndicator(gain)} flex flex-col`}>
					<span>{formatCurrency(gain, preferredCurrency)}</span>
					<span className={isNaN(gainPercentage) ? 'hidden' : ''}>
						{gainPercentage.toFixed(2)}%
					</span>
				</td>

				<StockRowActions stock={stock} setShowLots={setShowLots} />
			</tr>
			<tr>
				<td colSpan={7} className={`p-0 pb-4 ${showLots ? '' : 'hidden'}`}>
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
		<td className="h-full space-x-2">
			<button onClick={() => setShowLots((x) => !x)} className="hover:cursor-pointer">
				<IoEllipsisHorizontalCircleOutline size={24} />
			</button>
			<button onClick={deleteStock} className="hover:cursor-pointer">
				<IoTrashOutline className="text-red-500" size={24} />
			</button>
		</td>
	);
};
