import { Button } from '@oliverflecke/components-react';
import React, { useCallback } from 'react';
import { Stock, StockLot } from './models';
import { StockAction } from './state';
import StockLotRow from './StockLotRow';
import { IoAddCircleOutline } from 'react-icons/io5';

interface StockLotsTableProps {
	stock: Stock;
	lots: StockLot[];
	dispatch: (_: StockAction) => void;
}

const StockLotsTable: React.FC<StockLotsTableProps> = ({
	lots,
	stock,
	dispatch,
}: StockLotsTableProps) => {
	const addLot = useCallback(() => {
		dispatch({ type: 'ADD_LOT', symbol: stock.symbol });
	}, [dispatch, stock]);

	return (
		<>
			<h3 className="text-center text-2xl text-green-700 dark:text-green-400">
				Lots for {stock.displayName ?? stock.symbol}
			</h3>
			<div className="bg-coolGray-300 dark:bg-coolGray-700 rounded shadow mx-8">
				<table className="w-full">
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
						{lots.map((lot) => (
							<StockLotRow key={lot.id} lot={lot} stock={stock} />
						))}
					</tbody>
				</table>

				<div className="p-4">
					<Button onClick={addLot} className="space-x-2 btn btn-primary">
						<IoAddCircleOutline className="inline" />
						<span className="align-middle">Add lot</span>
					</Button>
				</div>
			</div>
		</>
	);
};

export default StockLotsTable;
