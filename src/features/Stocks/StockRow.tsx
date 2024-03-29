import React, { useCallback, useContext, useState } from 'react';
import { IoEllipsisHorizontalCircleOutline } from 'react-icons/io5';
import { getValueColorIndicator } from 'utils/colors';
import { formatCurrency, useConverter } from 'utils/converters';
import SettingsContext from 'features/Settings/context';
import { Stock, stockAvgPrice, stockGain, stockTotalShares } from './models';
import { StockContext } from './state';
import StockLotsTable from './StockLotsTable';
import DeleteButton from '../../components/DeleteButton';

interface StockRowProps {
	stock: Stock;
}

const StockRow: React.FC<StockRowProps> = ({ stock }: StockRowProps) => {
	const {
		values: { preferredDisplayCurrency, currencyRates },
	} = useContext(SettingsContext);
	const currencyConverter = useConverter(
		stock.currency,
		preferredDisplayCurrency,
		currencyRates.usd,
	);

	const totalShares = stockTotalShares(stock);
	const avgPrice = stockAvgPrice(stock);
	const buyMarketPrice = avgPrice * totalShares;
	const marketValue = stock.regularMarketPrice * totalShares;
	const gain = stockGain(stock, currencyRates, preferredDisplayCurrency);
	const gainPercentage = (marketValue / buyMarketPrice - 1) * 100;

	const [showLots, setShowLots] = useState(false);

	return (
		<>
			<tr className="relative w-full bg-gray-200 text-right dark:bg-gray-800">
				<td className="px-2 text-left">{stock.symbol}</td>
				<td className="px-2">
					{formatCurrency(stock.regularMarketPrice, stock.currency)}
				</td>
				<td className="px-0">
					{formatCurrency(
						currencyConverter(marketValue),
						preferredDisplayCurrency,
					)}
				</td>
				<td>{totalShares}</td>
				<td className={`px-2 ${getValueColorIndicator(avgPrice)}`}>
					{formatCurrency(avgPrice, stock.currency)}
				</td>
				<td className={`px-2 ${getValueColorIndicator(gain)}`}>
					<span>{formatCurrency(gain, preferredDisplayCurrency)}</span>
				</td>
				<td className={`px-1 ${getValueColorIndicator(gainPercentage)}`}>
					<span className={isNaN(gainPercentage) ? 'hidden' : ''}>
						{gainPercentage.toFixed(2)} %
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
		<td className="flex h-full flex-row justify-end space-x-2 px-4">
			<button
				onClick={() => setShowLots(x => !x)}
				className="hover:cursor-pointer"
			>
				<IoEllipsisHorizontalCircleOutline size={24} />
			</button>
			<DeleteButton onClick={deleteStock} />
		</td>
	);
};
