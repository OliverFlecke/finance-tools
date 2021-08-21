import React, { useMemo, useReducer } from 'react';
import { convertToCurrency, formatCurrency } from '../../utils/converters';
import { sum } from '../../utils/math';
import AddStock from './AddStock';
import { StockList } from './models';
import RefreshStocksButton from './RefreshStocksButton';
import { getDefaultStockState, StockContext, stockReducer } from './state';
import StockRow from './StockRow';

const Stocks: React.FC = () => {
	const [state, dispatch] = useReducer(stockReducer, getDefaultStockState());

	return (
		<StockContext.Provider value={{ state, dispatch }}>
			<h2 className="p-2 font-bold text-lg">Stocks</h2>
			<StocksTable stocks={state.stocks} />
			<StockActionBar />
		</StockContext.Provider>
	);
};

export default Stocks;

interface StocksTableProps {
	stocks: StockList;
}

const StocksTable: React.FC<StocksTableProps> = ({ stocks }: StocksTableProps) => {
	return (
		<div className="overflow-x-scroll">
			<table className="w-full">
				<thead>
					<tr className="text-sm align-bottom text-coolGray-600 dark:text-coolGray-400">
						<th>Symbol</th>
						<th>Current price</th>
						<th>Total value</th>
						<th>Total shares</th>
						<th>Average price</th>
						<th>Gain</th>
					</tr>
				</thead>
				<tbody>
					{stocks.map((stock) => (
						<StockRow key={stock.symbol} stock={stock} />
					))}
				</tbody>
				<tfoot>
					<SummaryRow stocks={stocks} />
				</tfoot>
			</table>
		</div>
	);
};

const StockActionBar = () => {
	return (
		<div className="p-4 space-x-4">
			<AddStock />
			<RefreshStocksButton />
		</div>
	);
};

const SummaryRow = ({ stocks }: { stocks: StockList }) => {
	const totalValue = useMemo(
		() =>
			sum(
				...stocks.flatMap((stock) =>
					stock.lots.map((lot) =>
						convertToCurrency(stock.regularMarketPrice * lot.shares, stock.currency)
					)
				)
			),
		[stocks]
	);
	const totalGain = useMemo(
		() =>
			sum(
				...stocks.flatMap((stock) =>
					stock.lots.map((lot) =>
						convertToCurrency(
							stock.regularMarketPrice * lot.shares - lot.price * lot.shares,
							stock.currency
						)
					)
				)
			),
		[stocks]
	);

	return (
		<tr className="text-right dark:text-purple-400">
			<td></td>
			<td></td>
			<td>{formatCurrency(totalValue)}</td>
			<td></td>
			<td></td>
			<td>{formatCurrency(totalGain)}</td>
		</tr>
	);
};
