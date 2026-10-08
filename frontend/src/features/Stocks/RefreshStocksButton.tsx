import { RotateCw } from "lucide-react";
import { useCallback, useContext } from "react";
import { Button } from "@/ui/Button/Button";
import { useSharesCallback } from "./API/yahoo";
import { StockContext } from "./state";

export default function RefreshStocksButton() {
	const { state, dispatch } = useContext(StockContext);
	const fetchShares = useSharesCallback();

	const reload = useCallback(async () => {
		try {
			const quotes = await fetchShares(...state.stocks.map((x) => x.symbol));
			dispatch({ type: "UPDATE STOCKS", stocks: quotes });
		} catch (err) {
			// TODO: Display error to user
			console.error(err);
		}
	}, [fetchShares, state.stocks, dispatch]);

	return (
		<Button onClick={reload} aria-label="Reload current stock prices">
			<RotateCw />
			Refresh stocks
		</Button>
	);
}
