import clsx from "clsx";
import SettingsContext from "features/Settings/context";
import { Ellipsis, Trash } from "lucide-react";
import type React from "react";
import { useCallback, useContext, useState } from "react";
import { getValueColorIndicator } from "utils/colors";
import { formatCurrency, useConverter } from "utils/converters";
import { Button } from "@/ui/Button/Button";
import { type Stock, stockAvgPrice, stockGain, stockTotalShares } from "./models";
import StockLotsTable from "./StockLotsTable";
import styles from "./StockRow.module.css";
import { StockContext } from "./state";

interface StockRowProps {
	stock: Stock;
}

const StockRow: React.FC<StockRowProps> = ({ stock }: StockRowProps) => {
	const {
		values: { preferredDisplayCurrency, currencyRates },
	} = useContext(SettingsContext);
	const currencyConverter = useConverter(
		stock.currency,
		preferredDisplayCurrency,
		currencyRates.usd,
	);

	const totalShares = stockTotalShares(stock);
	const avgPrice = stockAvgPrice(stock);
	const buyMarketPrice = avgPrice * totalShares;
	const marketValue = stock.regularMarketPrice * totalShares;
	const gain = stockGain(stock, currencyRates, preferredDisplayCurrency);
	const gainPercentage = (marketValue / buyMarketPrice - 1) * 100;

	const [showLots, setShowLots] = useState(false);

	return (
		<>
			<tr className={styles.row}>
				<td className={styles.symbol_cell}>{stock.symbol}</td>
				<td className={styles.cell}>{formatCurrency(stock.regularMarketPrice, stock.currency)}</td>
				<td className={styles.cell_tight}>
					{formatCurrency(currencyConverter(marketValue), preferredDisplayCurrency)}
				</td>
				<td>{totalShares}</td>
				<td className={clsx(styles.cell, getValueColorIndicator(avgPrice))}>
					{formatCurrency(avgPrice, stock.currency)}
				</td>
				<td className={clsx(styles.cell, getValueColorIndicator(gain))}>
					<span>{formatCurrency(gain, preferredDisplayCurrency)}</span>
				</td>
				<td className={clsx(styles.cell_narrow, getValueColorIndicator(gainPercentage))}>
					<span className={Number.isNaN(gainPercentage) ? styles.hidden : ""}>
						{gainPercentage.toFixed(2)} %
					</span>
				</td>

				<StockRowActions stock={stock} setShowLots={setShowLots} />
			</tr>
			<tr>
				<td colSpan={7} className={clsx(styles.lots_cell, !showLots && styles.hidden)}>
					<StockLotsTable lots={stock.lots} stock={stock} />
				</td>
			</tr>
		</>
	);
};

export default StockRow;

interface StockRowActionProps {
	stock: Stock;
	setShowLots: React.Dispatch<React.SetStateAction<boolean>>;
}

const StockRowActions = ({ stock, setShowLots }: StockRowActionProps) => {
	const { dispatch } = useContext(StockContext);

	const deleteStock = useCallback(() => {
		dispatch({ type: "DELETE STOCK", symbol: stock.symbol });
	}, [dispatch, stock.symbol]);

	return (
		<td className={styles.actions_cell}>
			<Button onClick={() => setShowLots((x) => !x)} icon>
				<Ellipsis />
			</Button>
			<Button onClick={deleteStock} icon variant="Danger">
				<Trash />
			</Button>
		</td>
	);
};
