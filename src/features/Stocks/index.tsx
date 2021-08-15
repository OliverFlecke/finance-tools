import React from 'react';
import { sum } from 'utils/math';
import { StockList } from './models';

const Stocks: React.FC = () => {
	const stocks = sampleData;

	return (
		<div className="p-2">
			<h2 className="text-lg">Stocks</h2>
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
		<table>
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
					const stock = stocks[key];
					const totalShares = sum(...stock.lots.map((x) => x.shares));
					const avgPrice = sum(...stock.lots.map((x) => x.shares * x.price)) / totalShares;

					return (
						<tr key={key} className="odd:bg-coolGray-800">
							<td>{key}</td>
							<td>{stock.currentValue}</td>
							<td>{stock.currentValue * totalShares}</td>
							<td>{totalShares}</td>
							<td>{avgPrice}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

const sampleData: StockList = {
	AAPL: {
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
