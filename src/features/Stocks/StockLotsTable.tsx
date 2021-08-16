import { Button } from '@oliverflecke/components-react';
import React, { useCallback } from 'react';
import { Stock, StockLot } from './models';
import { StockAction } from './state';
import StockLotRow from './StockLotRow';

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
		console.debug('Clicked add lot');
		dispatch({ type: 'ADD_LOT', symbol: stock.symbol });
	}, [dispatch, stock]);

	return (
		<>
			<h3 className="text-center text-2xl text-green-400">Lots</h3>
			<div className="bg-coolGray-700 rounded mx-8 mb-4">
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
						{lots.map((lot, i) => (
							<StockLotRow key={i} lot={lot} stock={stock} />
						))}
					</tbody>
				</table>

				<div className="p-4">
					<Button onClick={addLot}>Add lot</Button>
				</div>
			</div>
		</>
	);
};

export default StockLotsTable;
