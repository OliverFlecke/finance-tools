import { createContext } from 'react';
import { getDataFromStorage, storedReducer } from '../../utils/storage';
import { Stock, StockList, StockLot } from './models';
import { v4 as uuidv4 } from 'uuid';

const storageKey = 'stocks_state';

export const StockContext = createContext({
	// state: getDefaultStockState(),
	// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
	dispatch: (_: StockAction) => {},
});

export function stockReducer(state: StockState, action: StockAction): StockState {
	return storedReducer(storageKey, reducer)(state, action);
}

export function getDefaultStockState(): StockState {
	const state = getDataFromStorage(storageKey, {
		stocks: {},
	});

	for (const symbol of Object.keys(state.stocks)) {
		for (const lot of state.stocks[symbol].lots) {
			lot.date = new Date(Date.parse(lot.date));
		}
	}

	return state;
}

export interface StockState {
	stocks: StockList;
}

export type StockAction =
	| { type: 'ADD_STOCK'; stock: Stock }
	| { type: 'DELETE_STOCK'; symbol: string }
	| { type: 'ADD_LOT'; symbol: string }
	| { type: 'DELETE_LOT'; symbol: string; id: string }
	| { type: 'EDIT_LOT'; symbol: string; lot: StockLot };

function reducer(state: StockState, action: StockAction): StockState {
	console.debug(`received action: ${action.type}`);
	switch (action.type) {
		case 'ADD_STOCK': {
			const newState = { ...state };
			newState.stocks[action.stock.symbol] = action.stock;

			return newState;
		}
		case 'DELETE_STOCK': {
			const newStocks = { ...state.stocks };
			delete newStocks[action.symbol];

			return {
				...state,
				stocks: newStocks,
			};
		}

		case 'ADD_LOT': {
			const lot = {
				id: uuidv4(),
				date: new Date(),
				price: state.stocks[action.symbol].currentValue,
				shares: 0,
			};

			const newState = { ...state };
			newState.stocks[action.symbol].lots = state.stocks[action.symbol].lots.concat(lot);

			return newState;
		}
		case 'DELETE_LOT': {
			const newState = { ...state };
			newState.stocks[action.symbol].lots = newState.stocks[action.symbol].lots.filter(
				(x) => x.id !== action.id
			);

			return newState;
		}
		case 'EDIT_LOT': {
			state.stocks[action.symbol].lots = state.stocks[action.symbol].lots
				.filter((x) => x.id !== action.lot.id)
				.concat(action.lot);

			return state;
		}

		default:
			console.warn('action not implemented');
			return state;
	}
}
