import React, { useReducer } from 'react';
import AddStock from './AddStock';
import { StockList } from './models';
import { getDefaultStockState, StockContext, stockReducer } from './state';
import StockRow from './StockRow';

const Stocks: React.FC = () => {
	const [state, dispatch] = useReducer(stockReducer, getDefaultStockState());

	return (
		<div>
			<StockContext.Provider value={{ state, dispatch }}>
				<h2 className="p-2 font-bold text-lg">Stocks</h2>
				<StocksTable stocks={state.stocks} />
				<AddStock />
			</StockContext.Provider>
		</div>
	);
};

export default Stocks;

interface StocksTableProps {
	stocks: StockList;
}

const StocksTable: React.FC<StocksTableProps> = ({ stocks }: StocksTableProps) => {
	return (
		<table className="w-full">
			<thead>
				<tr>
					<th>Symbol</th>
					<th>Current price</th>
					<th>Total value</th>
					<th>Total shares</th>
					<th>Average price</th>
				</tr>
			</thead>
			<tbody>
				{Object.keys(stocks).map((key) => {
					return <StockRow key={key} stock={stocks[key]} />;
				})}
			</tbody>
		</table>
	);
};
