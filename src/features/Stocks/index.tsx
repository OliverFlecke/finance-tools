import React from 'react';
import { StockList } from './models';
import StockRow from './StockRow';

const Stocks: React.FC = () => {
	const stocks = sampleData;

	return (
		<div>
			<h2 className="p-2 font-bold text-lg">Stocks</h2>
			<StocksTable stocks={stocks} />
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

const sampleData: StockList = {
	AAPL: {
		symbol: 'AAPL',
		currentValue: 100,
		lots: [
			{
				date: new Date('2020-01-01'),
				shares: 15,
				price: 10,
			},
		],
	},
	MSFT: {
		symbol: 'MSFT',
		currentValue: 200,
		lots: [
			{
				date: new Date('2020-02-01'),
				shares: 3,
				price: 100,
			},
			{
				date: new Date('2020-03-01'),
				shares: 5,
				price: 120,
			},
		],
	},
};
