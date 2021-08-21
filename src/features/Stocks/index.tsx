import React, { useReducer } from 'react';
import { useEffect } from 'react';
import AddStock from './AddStock';
import { getCurrencies } from './API/currenciesApi';
import { StockList } from './models';
import RefreshStocksButton from './RefreshStocksButton';
import { getDefaultStockState, StockContext, stockReducer } from './state';
import StockRow from './StockRow';
import StockSettings from './StockSettings';
import StockSummaryRow from './StockSummaryRow';

const Stocks: React.FC = () => {
	const [state, dispatch] = useReducer(stockReducer, getDefaultStockState());

	useEffect(() => {
		getCurrencies()
			.then((rates) => dispatch({ type: 'SET CURRENCY RATES', rates }))
			.catch((err) => console.warn(err));
	}, []);

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
					<StockSummaryRow stocks={stocks} />
				</tfoot>
			</table>
		</div>
	);
};

const StockActionBar = () => {
	return (
		<div className="p-4 space-x-4 flex">
			<AddStock />
			<RefreshStocksButton />
			<StockSettings />
		</div>
	);
};
