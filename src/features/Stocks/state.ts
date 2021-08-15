import { createContext } from 'react';
import { getDataFromStorage, storedReducer } from '../../utils/storage';
import { Stock, StockList } from './models';

const storageKey = 'stocks_state';

export const StockContext = createContext({
	state: getDefaultStockState(),
	// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
	dispatch: (_: StockAction) => {},
});

export function stockReducer(state: StockState, action: StockAction): StockState {
	return storedReducer(storageKey, reducer)(state, action);
}

export function getDefaultStockState(): StockState {
	return getDataFromStorage(storageKey, {
		stocks: {},
	});
}

export interface StockState {
	stocks: StockList;
}

export type StockAction = { type: 'add stock'; stock: Stock };

function reducer(state: StockState, action: StockAction): StockState {
	switch (action.type) {
		case 'add stock':
			const newState = { ...state };
			newState.stocks[action.stock.symbol] = action.stock;

			return newState;

		default:
			console.warn('action not implemented');
			return state;
	}
}
