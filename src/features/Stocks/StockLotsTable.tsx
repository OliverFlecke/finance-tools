import { Button } from '@oliverflecke/components-react';
import React, { useCallback, useContext } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import { useAddStockLotCallback } from './API/stockApi';
import { Stock, StockLot } from './models';
import { StockContext } from './state';
import StockLotRow from './StockLotRow';

interface StockLotsTableProps {
	stock: Stock;
	lots: StockLot[];
}

const StockLotsTable: React.FC<StockLotsTableProps> = ({
	lots,
	stock,
}: StockLotsTableProps) => {
	const { dispatch } = useContext(StockContext);
	const addStockLot = useAddStockLotCallback();

	const addLot = useCallback(async () => {
		const lotId = await addStockLot({
			symbol: stock.symbol,
			shares: 0,
			buyDate: new Date(),
			buyPrice: 0,
			buyBrokerage: 0,
		});
		dispatch({ type: 'ADD LOT', symbol: stock.symbol, lotId: lotId });
	}, [addStockLot, dispatch, stock.symbol]);

	return (
		<>
			<h3 className="text-center text-2xl text-green-700 dark:text-green-400">
				Lots for {stock.displayName ?? stock.symbol}
			</h3>
			<div className="mx-8 rounded bg-gray-300 shadow dark:bg-gray-700">
				<table className="w-full">
					<thead>
						<tr>
							<th>Buy date</th>
							<th>Shares</th>
							<th>Buy price</th>
							<th>Market value</th>
							<th>Total gain</th>
						</tr>
					</thead>
					<tbody>
						{lots
							.sort((a, z) => a.buyDate.getTime() - z.buyDate.getTime())
							.map(lot => (
								<StockLotRow key={lot.id} lot={lot} stock={stock} />
							))}
					</tbody>
				</table>

				<div className="p-4">
					<Button onClick={addLot} className="btn btn-primary space-x-2">
						<IoAddCircleOutline className="inline" />
						<span className="align-middle">Add lot</span>
					</Button>
				</div>
			</div>
		</>
	);
};

export default StockLotsTable;
