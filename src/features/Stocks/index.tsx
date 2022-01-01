import React, { ReactNode, useCallback, useEffect, useReducer, useState } from 'react';
import { IoCaretDown, IoCaretUp } from 'react-icons/io5';
import { convertToCurrency } from '../../utils/converters';
import AddStock from './AddStock';
import { CurrencyRates, getCurrencies } from './API/currenciesApi';
import { getStocksForUser } from './API/stockApi';
import { getShares } from './API/yahoo';
import { Stock, stockAvgPrice, stockGain, StockList, stockTotalShares } from './models';
import RefreshStocksButton from './RefreshStocksButton';
import { getDefaultStockState, StockContext, stockReducer } from './state';
import StockRow from './StockRow';
import StockSettings from './StockSettings';
import StockSummaryRow from './StockSummaryRow';

const Stocks: React.FC = () => {
	const [state, dispatch] = useReducer(stockReducer, getDefaultStockState());

	useEffect(() => {
		getCurrencies()
			.then((rates) => dispatch({ type: 'SET CURRENCY RATES', rates }))
			.catch((err) => console.warn(err));
	}, []);

	useEffect(() => {
		getStocksForUser()
			.then((stocks) =>
				dispatch({
					type: 'SET STOCKS',
					stocks: stocks,
				})
			)
			// TODO: This code is replicated from the RefreshStockButton component.
			.then(async () => {
				const quotes = await getShares(...state.stocks.map((x) => x.symbol));
				dispatch({ type: 'UPDATE STOCKS', stocks: quotes });
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<StockContext.Provider value={{ state, dispatch }}>
			<h2 className="text-xl px-4 py-4">Stocks</h2>
			<StocksTable
				stocks={state.stocks}
				preferredCurrency={state.preferredCurrency}
				currencyRates={state.currencyRates}
			/>
			<StockActionBar />
		</StockContext.Provider>
	);
};

export default Stocks;

interface StocksTableProps {
	stocks: StockList;
	currencyRates?: CurrencyRates;
	preferredCurrency?: string;
}

type StockColumn =
	| 'Symbol'
	| 'Current price'
	| 'Total value'
	| 'Total shares'
	| 'Average price'
	| 'Gain'
	| 'Gain percentage';

const StocksTable: React.FC<StocksTableProps> = ({
	stocks,
	currencyRates,
	preferredCurrency,
}: StocksTableProps) => {
	const [sortKey, setSortKey] = useState<StockColumn | undefined>();
	const [ascending, setAscending] = useState(false);

	return (
		<div className="overflow-x-scroll">
			<table className="w-full">
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
						.sort(stocksComparer(sortKey, ascending, preferredCurrency, currencyRates))
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
};

interface StockTableHeaderProps {
	sortKey?: StockColumn;
	ascending: boolean;
	setAscending: React.Dispatch<React.SetStateAction<boolean>>;
	setSortKey: React.Dispatch<React.SetStateAction<StockColumn | undefined>>;
}
const StockTableHeader = ({
	sortKey,
	ascending,
	setAscending,
	setSortKey,
}: StockTableHeaderProps) => {
	const sort = useCallback(
		(key: StockColumn) => () => {
			if (sortKey === key) {
				setAscending((x) => !x);
			} else {
				setSortKey(key);
			}
		},
		[setSortKey, setAscending, sortKey]
	);

	return (
		<tr className="text-sm align-bottom text-gray-600 dark:text-gray-400">
			<Header sort={sort} currentSortKey={sortKey} sortKey={'Symbol'} ascending={ascending}>
				Symbol
			</Header>
			<Header sort={sort} currentSortKey={sortKey} sortKey={'Current price'} ascending={ascending}>
				Price
			</Header>
			<Header sort={sort} currentSortKey={sortKey} sortKey={'Total value'} ascending={ascending}>
				Total value
			</Header>
			<Header sort={sort} currentSortKey={sortKey} sortKey={'Total shares'} ascending={ascending}>
				Shares
			</Header>
			<Header sort={sort} currentSortKey={sortKey} sortKey={'Average price'} ascending={ascending}>
				Avg price
			</Header>
			<Header sort={sort} currentSortKey={sortKey} sortKey={'Gain'} ascending={ascending}>
				Gain
			</Header>
			<Header sort={sort} currentSortKey={sortKey} sortKey="Gain percentage" ascending={ascending}>
				Percentage
			</Header>
		</tr>
	);
};

const StockActionBar = () => {
	return (
		<div className="p-4 justify-between flex">
			<AddStock />
			<RefreshStocksButton />
			<StockSettings />
		</div>
	);
};

interface HeaderProps {
	sort: (key: StockColumn) => () => void;
	children: ReactNode;
	currentSortKey?: StockColumn;
	sortKey: StockColumn;
	ascending: boolean;
}
const Header = ({ sort, children, currentSortKey, sortKey, ascending }: HeaderProps) => (
	<th>
		<button
			onClick={sort(sortKey)}
			className="focus:ring-1 ring-red-800 dark:ring-red-600 rounded-sm"
		>
			{children}
			{sortKey === currentSortKey && <Caret ascending={ascending} />}
		</button>
	</th>
);

const Caret = ({ ascending }: { ascending: boolean }) => (
	<>{ascending ? <IoCaretDown className="inline" /> : <IoCaretUp className="inline" />}</>
);

function stocksComparer(
	key?: StockColumn,
	ascending?: boolean,
	preferredCurrency?: string,
	currencyRates?: CurrencyRates
): (a: Stock, b: Stock) => number {
	if (!key) return () => 0;

	const convert = (stock: Stock) =>
		convertToCurrency(
			stock.regularMarketPrice,
			stock.currency,
			preferredCurrency,
			currencyRates?.usd
		);

	return (a, b) => {
		let result = 0;
		switch (key) {
			case 'Symbol':
				result = a.symbol.localeCompare(b.symbol);
				break;
			case 'Gain':
				result =
					stockGain(a, preferredCurrency, currencyRates) -
					stockGain(b, preferredCurrency, currencyRates);
				break;
			case 'Gain percentage':
				const getStockGainInPercentage = (stock: Stock): number => {
					const totalShares = stockTotalShares(stock);
					const buyMarketPrice = stockAvgPrice(stock) * totalShares;
					return ((stock.regularMarketPrice * totalShares) / buyMarketPrice - 1) * 100;
				};

				result = getStockGainInPercentage(a) - getStockGainInPercentage(b);
				break;
			case 'Average price':
				result =
					convertToCurrency(stockAvgPrice(a), a.currency, preferredCurrency, currencyRates?.usd) -
					convertToCurrency(stockAvgPrice(b), b.currency, preferredCurrency, currencyRates?.usd);
				break;
			case 'Current price':
				result = convert(a) - convert(b);
				break;
			case 'Total shares':
				result = stockTotalShares(a) - stockTotalShares(b);
				break;
			case 'Total value':
				result = convert(a) * stockTotalShares(a) - convert(b) * stockTotalShares(b);
				break;
		}

		return result * (ascending ? 1 : -1);
	};
}
