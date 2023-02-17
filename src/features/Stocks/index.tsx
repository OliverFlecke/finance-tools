import { CurrencyRates } from 'features/Currency/api';
import SettingsContext from 'features/Settings/context';
import React, {
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useReducer,
	useState,
} from 'react';
import { IoCaretDown, IoCaretUp } from 'react-icons/io5';
import { convertToCurrency } from '../../utils/converters';
import AddStock from './AddStock';
import { useFetchStocks } from './API/stockApi';
import { useSharesCallback } from './API/yahoo';
import {
	Stock,
	stockAvgPrice,
	stockGain,
	StockList,
	stockTotalShares,
} from './models';
import RefreshStocksButton from './RefreshStocksButton';
import { getDefaultStockState, StockContext, stockReducer } from './state';
import StockRow from './StockRow';
import StockSummaryRow from './StockSummaryRow';

const Stocks: React.FC = () => {
	const [state, dispatch] = useReducer(stockReducer, getDefaultStockState());
	const stocks = useFetchStocks();
	const fetchShares = useSharesCallback();

	// Set the stocks to the state
	useEffect(() => {
		if (!stocks.loading && stocks.data) {
			// const stocks = stocks.data;
			dispatch({
				type: 'SET STOCKS',
				stocks: stocks.data,
			});

			// Fetch stocks rates from Yahoo when new stocks come in
			(async () => {
				if (stocks.data) {
					const quotes = await fetchShares(...stocks.data.map(x => x.symbol));
					dispatch({ type: 'UPDATE STOCKS', stocks: quotes });
				}
			})();
		}
	}, [stocks.data]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<StockContext.Provider value={{ state, dispatch }}>
			<h2 className="page-header">Stocks</h2>
			<StocksTable stocks={state.stocks} />
			<StockActionBar />
		</StockContext.Provider>
	);
};

export default Stocks;

interface StocksTableProps {
	stocks: StockList;
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
}: StocksTableProps) => {
	const {
		values: { currencyRates, preferredDisplayCurrency },
	} = useContext(SettingsContext);
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
						.sort(
							stocksComparer(
								currencyRates,
								sortKey,
								ascending,
								preferredDisplayCurrency
							)
						)
						.map(stock => (
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
				setAscending(x => !x);
			} else {
				setSortKey(key);
			}
		},
		[setSortKey, setAscending, sortKey]
	);

	return (
		<tr className="align-bottom text-sm text-gray-600 dark:text-gray-400">
			<Header
				sort={sort}
				currentSortKey={sortKey}
				sortKey={'Symbol'}
				ascending={ascending}
			>
				Symbol
			</Header>
			<Header
				sort={sort}
				currentSortKey={sortKey}
				sortKey={'Current price'}
				ascending={ascending}
			>
				Price
			</Header>
			<Header
				sort={sort}
				currentSortKey={sortKey}
				sortKey={'Total value'}
				ascending={ascending}
			>
				Total value
			</Header>
			<Header
				sort={sort}
				currentSortKey={sortKey}
				sortKey={'Total shares'}
				ascending={ascending}
			>
				Shares
			</Header>
			<Header
				sort={sort}
				currentSortKey={sortKey}
				sortKey={'Average price'}
				ascending={ascending}
			>
				Avg price
			</Header>
			<Header
				sort={sort}
				currentSortKey={sortKey}
				sortKey={'Gain'}
				ascending={ascending}
			>
				Gain
			</Header>
			<Header
				sort={sort}
				currentSortKey={sortKey}
				sortKey="Gain percentage"
				ascending={ascending}
			>
				Percentage
			</Header>
		</tr>
	);
};

const StockActionBar = () => {
	return (
		<div className="flex justify-between p-4">
			<AddStock />
			<RefreshStocksButton />
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
const Header = ({
	sort,
	children,
	currentSortKey,
	sortKey,
	ascending,
}: HeaderProps) => (
	<th>
		<button
			onClick={sort(sortKey)}
			className="whitespace-nowrap rounded-sm ring-red-800 focus:ring-1 dark:ring-red-600"
		>
			{children}
			{sortKey === currentSortKey && <Caret ascending={ascending} />}
		</button>
	</th>
);

const Caret = ({ ascending }: { ascending: boolean }) => (
	<>
		{ascending ? (
			<IoCaretDown className="inline" />
		) : (
			<IoCaretUp className="inline" />
		)}
	</>
);

function stocksComparer(
	currencyRates: CurrencyRates,
	key?: StockColumn,
	ascending?: boolean,
	preferredCurrency?: string
): (a: Stock, b: Stock) => number {
	if (!key) return () => 0;

	const convert = (stock: Stock) =>
		convertToCurrency(
			stock.regularMarketPrice,
			currencyRates?.usd,
			stock.currency,
			preferredCurrency
		);

	return (a, b) => {
		let result = 0;
		switch (key) {
			case 'Symbol':
				result = a.symbol.localeCompare(b.symbol);
				break;
			case 'Gain':
				result =
					stockGain(a, currencyRates, preferredCurrency) -
					stockGain(b, currencyRates, preferredCurrency);
				break;
			case 'Gain percentage':
				const getStockGainInPercentage = (stock: Stock): number => {
					const totalShares = stockTotalShares(stock);
					const buyMarketPrice = stockAvgPrice(stock) * totalShares;
					return (
						((stock.regularMarketPrice * totalShares) / buyMarketPrice - 1) *
						100
					);
				};

				result = getStockGainInPercentage(a) - getStockGainInPercentage(b);
				break;
			case 'Average price':
				result =
					convertToCurrency(
						stockAvgPrice(a),
						currencyRates.usd,
						a.currency,
						preferredCurrency
					) -
					convertToCurrency(
						stockAvgPrice(b),
						currencyRates.usd,
						b.currency,
						preferredCurrency
					);
				break;
			case 'Current price':
				result = convert(a) - convert(b);
				break;
			case 'Total shares':
				result = stockTotalShares(a) - stockTotalShares(b);
				break;
			case 'Total value':
				result =
					convert(a) * stockTotalShares(a) - convert(b) * stockTotalShares(b);
				break;
		}

		return result * (ascending ? 1 : -1);
	};
}
