import React from 'react';
import { Stock, StockLot } from './models';

interface StockLotsTableProps {
	stock: Stock;
	lots: StockLot[];
}

const StockLotsTable: React.FC<StockLotsTableProps> = ({ lots, stock }: StockLotsTableProps) => {
	return (
		<>
			<h3 className="text-center text-2xl text-green-400">Lots</h3>
			<div className="bg-coolGray-700 rounded mx-8">
				<table className="w-full mb-4">
					<thead>
						<tr>
							<th>Buy date</th>
							<th>Amount</th>
							<th>Price</th>
							<th>Market value</th>
							<th>Total gain</th>
						</tr>
					</thead>
					<tbody>
						{lots.map((lot) => {
							const marketValue = lot.shares * stock.currentValue;
							const gain = marketValue - lot.price * lot.shares;

							return (
								<tr key={lot.date.toISOString()} className="odd:bg-coolGray-600">
									<td>{lot.date.toDateString()}</td>
									<td>{lot.price}</td>
									<td>{lot.shares}</td>
									<td>{marketValue}</td>
									<td className={getValueColorIndicator(gain)}>{gain}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default StockLotsTable;

function getValueColorIndicator(value: number): string {
	if (value > 0) return 'text-green-500';
	else if (value < 0) return 'text-red-500';
	else return '';
}
