import { createContext } from 'react';
import { Account, AccountEntries } from '../models/Account';

export const AccountContext = createContext({
	state: {
		accounts: [] as Account[],
		entries: {},
	},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	dispatch: (_: AccountAction) => {},
});

export interface AccountState {
	accounts: Account[];
	entries: AccountEntries;
}

export function accountReducer(state: AccountState, action: AccountAction): AccountState {
	console.log(`Got action '${action.type}'`);
	const newState = reducer(state, action);

	localStorage.setItem('accounts', JSON.stringify(newState.accounts));
	localStorage.setItem('entries', JSON.stringify(newState.entries));

	console.debug(newState);

	return newState;
}
export function initAccountState(): AccountState {
	return {
		accounts: getData('accounts', []),
		entries: getData('entries', {}),
	};
}

export type AccountAction =
	| { type: 'add account'; account: Account }
	| { type: 'add entry'; date: string }
	| { type: 'edit entry for account'; name: string; value: number; key: string };

function reducer(state: AccountState, action: AccountAction): AccountState {
	switch (action.type) {
		case 'add account':
			return {
				...state,
				accounts: state.accounts.concat(action.account),
			};
		case 'add entry':
			state.entries[action.date] = {};
			return {
				...state,
			};
		case 'edit entry for account':
			state.entries[action.key][action.name] = action.value;
			return {
				...state,
			};

		default:
			console.warn(`action type not handled: ${JSON.stringify(action)}`);
			return state;
	}
}

function getData(key: string, defaultValue: any = {}): any {
	const data = localStorage.getItem(key) ?? '';
	return data === undefined || data === '' ? defaultValue : JSON.parse(data);
}
