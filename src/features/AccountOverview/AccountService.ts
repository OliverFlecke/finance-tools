import { createContext } from 'react';
import { sortObject } from 'utils/converters';
import { getDataFromStorage, storedReducer } from 'utils/storage';
import { Account, AccountEntries } from './models/Account';

export const AccountContext = createContext({
	state: {
		accounts: [] as Account[],
		entries: {} as AccountEntries,
	},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
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
	return storedReducer('account_state', reducer)(state, action);
}

export function initAccountState(): AccountState {
	return getDataFromStorage('account_state', getDefaultAccountState());
}

export type AccountAction =
	| { type: 'ADD ACCOUNT'; account: Account }
	| { type: 'ADD ENTRY'; date: string }
	| { type: 'DELETE ENTRY'; date: string }
	| { type: 'RESET' }
	| { type: 'LOAD STATE'; state: AccountState }
	| { type: 'EDIT ENTRY FOR ACCOUNT'; name: string; value: number; key: string };

function reducer(state: AccountState, action: AccountAction): AccountState {
	switch (action.type) {
		case 'RESET':
			return getDefaultAccountState();
		case 'LOAD STATE':
			return {
				...action.state,
				accounts: action.state.accounts.sort((a, z) => a.name.localeCompare(z.name)),
			};
		case 'ADD ACCOUNT':
			return {
				...state,
				accounts: state.accounts.concat(action.account),
			};
		case 'ADD ENTRY':
			state.entries[action.date] = {};
			return {
				...state,
			};
		case 'EDIT ENTRY FOR ACCOUNT':
			state.entries[action.key][action.name] = action.value;
			state.entries = sortObject(state.entries);
			return {
				...state,
			};
		case 'DELETE ENTRY':
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
