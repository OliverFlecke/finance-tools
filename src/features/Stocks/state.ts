import { createContext } from 'react';
import { getDataFromStorage, storedReducer } from '../../utils/storage';
import { Stock, StockList, StockLot } from './models';
import { v4 as uuidv4 } from 'uuid';
import { QuoteResponse } from './API/yahoo';

const storageKey = 'stocks_state';

export const StockContext = createContext({
	state: getDefaultStockState(),
	// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
	dispatch: (_: StockAction) => {},
});

export function stockReducer(
	state: StockState,
	action: StockAction,
): StockState {
	return storedReducer(storageKey, reducer)(state, action);
}

export function getDefaultStockState(): StockState {
	const state = getDataFromStorage<StockState>(storageKey, {
		stocks: [],
		preferredCurrency: 'usd',
		currencyRates: {
			usd: {},
		},
		error: null,
	});

	return state;
}

export interface StockError {
	type: 'MISSING STOCKS';
	message: string;
}

export interface StockState {
	stocks: StockList;
	preferredCurrency: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	currencyRates: { usd: any };
	error: StockError | null;
}

export type StockAction =
	| { type: 'ADD STOCK'; stock: Stock }
	| { type: 'DELETE STOCK'; symbol: string }
	| { type: 'UPDATE STOCKS'; stocks: QuoteResponse[] | null }
	| { type: 'SET STOCKS'; stocks: StockList }
	| { type: 'ADD LOT'; symbol: string; lotId?: string }
	| { type: 'DELETE LOT'; symbol: string; id: string }
	| { type: 'EDIT LOT'; symbol: string; lot: StockLot };

function reducer(state: StockState, action: StockAction): StockState {
	if (process.env.NODE_ENV === 'development') {
		console.debug(`received action: ${action.type}`);
	}

	switch (action.type) {
		case 'ADD STOCK':
			if (state.stocks.find(x => x.symbol === action.stock.symbol)) {
				return state;
			}

			return {
				...state,
				stocks: state.stocks.concat(action.stock),
			};

		case 'DELETE STOCK':
			return {
				...state,
				stocks: state.stocks.filter(x => x.symbol !== action.symbol),
			};
		case 'UPDATE STOCKS':
			console.log('Updating stocks');
			console.log(action.stocks);
			if (action.stocks !== null) {
				const stocks = action.stocks;

				return {
					...state,
					error: null,
					stocks: state.stocks.map(old => {
						const stock = stocks.find(x => x.symbol === old.symbol);

						return {
							...old,
							...stock,
							lots: old.lots,
						};
					}),
				};
			} else {
				return {
					...state,
					error: {
						type: 'MISSING STOCKS',
						message: 'Unable to retrieve stock prices',
					},
				};
			}

		case 'SET STOCKS':
			return {
				...state,
				stocks: action.stocks.map(stock => ({
					...stock,
					lots: stock.lots ?? [],
				})),
			};

		case 'ADD LOT': {
			const lot: StockLot = {
				id: action.lotId ?? uuidv4(),
				shares: 0,
				buyDate: new Date(),
				buyPrice:
					state.stocks.find(x => x.symbol === action.symbol)
						?.regularMarketPrice ?? 0,
				buyBrokerage: 0,
			};

			return {
				...state,
				stocks: state.stocks.map(stock =>
					stock.symbol !== action.symbol
						? stock
						: {
								...stock,
								lots: stock.lots.concat(lot),
						  },
				),
			};
		}
		case 'DELETE LOT':
			return {
				...state,
				stocks: state.stocks.map(stock =>
					stock.symbol !== action.symbol
						? stock
						: {
								...stock,
								lots: stock.lots.filter(x => x.id !== action.id),
						  },
				),
			};

		case 'EDIT LOT':
			return {
				...state,
				stocks: state.stocks.map(stock =>
					stock.symbol !== action.symbol
						? stock
						: {
								...stock,
								lots: stock.lots
									.filter(x => x.id !== action.lot.id)
									.concat(action.lot),
						  },
				),
			};

		default:
			console.warn('action not implemented');
			return state;
	}
}
