"use client";

import type { CurrencyRates } from "features/Currency/api";
import SettingsContext from "features/Settings/context";
import { ChevronDown, ChevronUp } from "lucide-react";
import type React from "react";
import { type ReactNode, useCallback, useContext, useEffect, useReducer, useState } from "react";
import { convertToCurrency } from "@/utils/converters";
import AddStock from "./AddStock";
import { useFetchStocks } from "./API/stockApi";
import { useSharesCallback } from "./API/yahoo";
import styles from "./index.module.css";
import { type Stock, type StockList, stockAvgPrice, stockGain, stockTotalShares } from "./models";
import RefreshStocksButton from "./RefreshStocksButton";
import StockErrorDisplay from "./StockErrorDisplay";
import StockRow from "./StockRow";
import StockSummaryRow from "./StockSummaryRow";
import { getDefaultStockState, StockContext, stockReducer } from "./state";

export default function Stocks() {
	const [state, dispatch] = useReducer(stockReducer, getDefaultStockState());
	const stocks = useFetchStocks();
	const fetchShares = useSharesCallback();

	// Set the stocks to the state
	useEffect(() => {
		if (!stocks.loading && stocks.data) {
			// const stocks = stocks.data;
			dispatch({
				type: "SET STOCKS",
				stocks: stocks.data,
			});

			// Fetch stocks rates from Yahoo when new stocks come in
			(async () => {
				if (stocks.data) {
					const quotes = await fetchShares(...stocks.data.map((x) => x.symbol));
					dispatch({ type: "UPDATE STOCKS", stocks: quotes });
				}
			})();
		}
	}, [stocks.data, stocks.loading, fetchShares]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<StockContext.Provider value={{ state, dispatch }}>
			<StockErrorDisplay error={state.error} />
			<StocksTable stocks={state.stocks} />
			<StockActionBar />
		</StockContext.Provider>
	);
}

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

function StocksTable({ stocks }: StocksTableProps) {
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
						sortKey={sortKey}
						ascending={ascending}
						setAscending={setAscending}
						setSortKey={setSortKey}
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
			<Header sort={sort} currentSortKey={sortKey} sortKey={"Symbol"} ascending={ascending}>
				Symbol
			</Header>
			<Header sort={sort} currentSortKey={sortKey} sortKey={"Current price"} ascending={ascending}>
				Price
			</Header>
			<Header sort={sort} currentSortKey={sortKey} sortKey={"Total value"} ascending={ascending}>
				Total value
			</Header>
			<Header sort={sort} currentSortKey={sortKey} sortKey={"Total shares"} ascending={ascending}>
				Shares
			</Header>
			<Header sort={sort} currentSortKey={sortKey} sortKey={"Average price"} ascending={ascending}>
				Avg price
			</Header>
			<Header sort={sort} currentSortKey={sortKey} sortKey={"Gain"} ascending={ascending}>
				Gain
			</Header>
			<Header sort={sort} currentSortKey={sortKey} sortKey="Gain percentage" ascending={ascending}>
				Percentage
			</Header>
		</tr>
	);
}

function StockActionBar() {
	return (
		<div className={styles.action_bar}>
			<AddStock />
			<RefreshStocksButton />
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
