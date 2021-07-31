import { createContext } from 'react';
import { Account, AccountEntries } from '../models/Account';
import { sortObject } from '../utils/converters';

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

function getDefaultAccountState(): AccountState {
	return {
		accounts: [],
		entries: {},
	};
}

export function accountReducer(state: AccountState, action: AccountAction): AccountState {
	console.log(`Got action '${action.type}'`);
	const newState = reducer(state, action);

	localStorage.setItem('account_state', JSON.stringify(newState));

	return newState;
}
export function initAccountState(): AccountState {
	return getData('account_state', getDefaultAccountState());
}

export type AccountAction =
	| { type: 'add account'; account: Account }
	| { type: 'add entry'; date: string }
	| { type: 'delete entry'; date: string }
	| { type: 'reset' }
	| { type: 'load state'; state: AccountState }
	| { type: 'edit entry for account'; name: string; value: number; key: string };

function reducer(state: AccountState, action: AccountAction): AccountState {
	switch (action.type) {
		case 'reset':
			return getDefaultAccountState();
		case 'load state':
			return action.state;
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
			state.entries = sortObject(state.entries);
			return {
				...state,
			};
		case 'delete entry':
			delete state.entries[action.date];
			return {
				...state,
				entries: state.entries,
			};

		default:
			console.warn(`action type not handled: ${JSON.stringify(action)}`);
			return state;
	}
}

function getData(key: string, defaultValue: any = {}): any {
	const data = localStorage.getItem(key) ?? undefined;
	return data === undefined || data === '' ? defaultValue : JSON.parse(data);
}
