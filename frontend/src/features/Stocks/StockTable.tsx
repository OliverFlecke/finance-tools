/**
 * This file is not really used any more, but I would like to have some of the
 * functionality migrated over to the portfolio tracker later.
 */

import type { CurrencyRates } from "features/Currency/api";
import SettingsContext from "features/Settings/context";
import { ChevronDown, ChevronUp } from "lucide-react";
import type React from "react";
import { type ReactNode, useCallback, useContext, useState } from "react";
import { convertToCurrency } from "@/utils/converters";
import ImportStocks from "./ImportStocks";
import styles from "./index.module.css";
import { type Stock, type StockList, stockAvgPrice, stockGain, stockTotalShares } from "./models";
import StockRow from "./StockRow";
import StockSummaryRow from "./StockSummaryRow";

interface StocksTableProps {
	stocks: StockList;
}

type StockColumn =
	| "Symbol"
	| "Current price"
	| "Total value"
	| "Total shares"
	| "Average price"
	| "Gain"
	| "Gain percentage";

export default function StocksTable({ stocks }: StocksTableProps) {
	const {
		values: { currencyRates, preferredDisplayCurrency },
	} = useContext(SettingsContext);
	const [sortKey, setSortKey] = useState<StockColumn | undefined>();
	const [ascending, setAscending] = useState(false);

	return (
		<div className={styles.table_wrapper}>
			<table className={styles.table}>
				<thead>
					<StockTableHeader
						ascending={ascending}
						setAscending={setAscending}
						setSortKey={setSortKey}
						sortKey={sortKey}
					/>
				</thead>
				<tbody>
					{stocks
						.sort(stocksComparer(currencyRates, sortKey, ascending, preferredDisplayCurrency))
						.map((stock) => (
							<StockRow key={stock.symbol} stock={stock} />
						))}
				</tbody>
				<tfoot>
					<StockSummaryRow stocks={stocks} />
				</tfoot>
			</table>
		</div>
	);
}

interface StockTableHeaderProps {
	sortKey?: StockColumn;
	ascending: boolean;
	setAscending: React.Dispatch<React.SetStateAction<boolean>>;
	setSortKey: React.Dispatch<React.SetStateAction<StockColumn | undefined>>;
}
function StockTableHeader({ sortKey, ascending, setAscending, setSortKey }: StockTableHeaderProps) {
	const sort = useCallback(
		(key: StockColumn) => () => {
			if (sortKey === key) {
				setAscending((x) => !x);
			} else {
				setSortKey(key);
			}
		},
		[setSortKey, setAscending, sortKey],
	);

	return (
		<tr className={styles.header_row}>
			<Header ascending={ascending} currentSortKey={sortKey} sort={sort} sortKey={"Symbol"}>
				Symbol
			</Header>
			<Header ascending={ascending} currentSortKey={sortKey} sort={sort} sortKey={"Current price"}>
				Price
			</Header>
			<Header ascending={ascending} currentSortKey={sortKey} sort={sort} sortKey={"Total value"}>
				Total value
			</Header>
			<Header ascending={ascending} currentSortKey={sortKey} sort={sort} sortKey={"Total shares"}>
				Shares
			</Header>
			<Header ascending={ascending} currentSortKey={sortKey} sort={sort} sortKey={"Average price"}>
				Avg price
			</Header>
			<Header ascending={ascending} currentSortKey={sortKey} sort={sort} sortKey={"Gain"}>
				Gain
			</Header>
			<Header ascending={ascending} currentSortKey={sortKey} sort={sort} sortKey="Gain percentage">
				Percentage
			</Header>
		</tr>
	);
}

function StockActionBar() {
	return (
		<div className={styles.action_bar}>
			{/* <AddStock /> */}
			<ImportStocks />
			{/* <RefreshStocksButton /> */}
		</div>
	);
}

interface HeaderProps {
	sort: (key: StockColumn) => () => void;
	children: ReactNode;
	currentSortKey?: StockColumn;
	sortKey: StockColumn;
	ascending: boolean;
}
function Header({ sort, children, currentSortKey, sortKey, ascending }: HeaderProps) {
	return (
		<th>
			<button type="button" onClick={sort(sortKey)} className={styles.sort_button}>
				{children}
				{sortKey === currentSortKey && <Caret ascending={ascending} />}
			</button>
		</th>
	);
}

function Caret({ ascending }: { ascending: boolean }) {
	return <>{ascending ? <ChevronDown /> : <ChevronUp />}</>;
}

function stocksComparer(
	currencyRates: CurrencyRates,
	key?: StockColumn,
	ascending?: boolean,
	preferredCurrency?: string,
): (a: Stock, b: Stock) => number {
	if (!key) return () => 0;

	const convert = (stock: Stock) =>
		convertToCurrency(
			stock.regularMarketPrice,
			currencyRates?.usd,
			stock.currency,
			preferredCurrency,
		);

	return (a, b) => {
		let result = 0;
		switch (key) {
			case "Symbol":
				result = a.symbol.localeCompare(b.symbol);
				break;
			case "Gain":
				result =
					stockGain(a, currencyRates, preferredCurrency) -
					stockGain(b, currencyRates, preferredCurrency);
				break;
			case "Gain percentage": {
				const getStockGainInPercentage = (stock: Stock): number => {
					const totalShares = stockTotalShares(stock);
					const buyMarketPrice = stockAvgPrice(stock) * totalShares;
					return ((stock.regularMarketPrice * totalShares) / buyMarketPrice - 1) * 100;
				};

				result = getStockGainInPercentage(a) - getStockGainInPercentage(b);
				break;
			}
			case "Average price":
				result =
					convertToCurrency(stockAvgPrice(a), currencyRates.usd, a.currency, preferredCurrency) -
					convertToCurrency(stockAvgPrice(b), currencyRates.usd, b.currency, preferredCurrency);
				break;
			case "Current price":
				result = convert(a) - convert(b);
				break;
			case "Total shares":
				result = stockTotalShares(a) - stockTotalShares(b);
				break;
			case "Total value":
				result = convert(a) * stockTotalShares(a) - convert(b) * stockTotalShares(b);
				break;
		}

		return result * (ascending ? 1 : -1);
	};
}
