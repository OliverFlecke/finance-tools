import React, { useReducer } from 'react';
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
					<tr className="text-coolGray-600 dark:text-coolGray-400">
						<th>Symbol</th>
						<th>Current price</th>
						<th>Total value</th>
						<th>Total shares</th>
						<th>Average price</th>
					</tr>
				</thead>
				<tbody>
					{stocks.map((stock) => (
						<StockRow key={stock.symbol} stock={stock} />
					))}
				</tbody>
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
