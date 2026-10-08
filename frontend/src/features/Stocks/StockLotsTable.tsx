import { Plus } from "lucide-react";
import { useCallback, useContext } from "react";
import { Button } from "@/ui/Button/Button";
import { useAddStockLotCallback } from "./API/stockApi";
import type { Stock, StockLot } from "./models";
import StockLotRow from "./StockLotRow";
import styles from "./StockLotsTable.module.css";
import { StockContext } from "./state";

interface StockLotsTableProps {
	stock: Stock;
	lots: StockLot[];
}

export default function StockLotsTable({ lots, stock }: StockLotsTableProps) {
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
		dispatch({ type: "ADD LOT", symbol: stock.symbol, lotId: lotId });
	}, [addStockLot, dispatch, stock.symbol]);

	return (
		<>
			<h3 className={styles.heading}>Lots for {stock.displayName ?? stock.symbol}</h3>
			<div className={styles.panel}>
				<table className={styles.table}>
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
							.map((lot) => (
								<StockLotRow key={lot.id} lot={lot} stock={stock} />
							))}
					</tbody>
				</table>

				<div className={styles.footer}>
					<Button onClick={addLot}>
						<Plus />
						Add lot
					</Button>
				</div>
			</div>
		</>
	);
}
