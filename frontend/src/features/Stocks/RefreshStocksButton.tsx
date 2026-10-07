import clsx from "clsx";
import type React from "react";
import { useCallback, useContext } from "react";
import { IoReload } from "react-icons/io5";
import { Button } from "@/ui/Button/Button";
import { useSharesCallback } from "./API/yahoo";
import styles from "./RefreshStocksButton.module.css";
import { StockContext } from "./state";

const RefreshStocksButton: React.FC = () => {
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
		<Button onClick={reload} className={clsx("btn btn-primary", styles.button)}>
			<IoReload aria-label="Reload current stock prices" className={styles.icon} />
			<span className={styles.label}>Refresh stocks</span>
		</Button>
	);
};

export default RefreshStocksButton;
