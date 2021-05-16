import { Account, AccountEntries } from '../models/Account';

export interface AccountState {
	accounts: Account[];
	entries: AccountEntries;
}

export function accountReducer(state: AccountState, action: AccountAction): AccountState {
	switch (action.type) {
		case 'add account':
			console.debug(`Reducer: Adding account ${JSON.stringify(action.account)}`);
			return {
				...state,
				accounts: state.accounts.concat(action.account),
			};

		default:
			console.warn(`action type not handled: ${action.type}`);
			return state;
	}
}
export function initAccountState(): AccountState {
	return {
		accounts: getData('accounts'),
		entries: getData('entries'),
	};
}

export type AccountAction = { type: 'add account'; account: Account };

function getData(key: string): any {
	const data = localStorage.getItem(key) ?? '';
	return data === undefined || data === '' ? [] : JSON.parse(data);
}

const entries: AccountEntries = {
	'2021-03-01': {
		Primary: 50,
		Savings: 100,
		Investments: 500,
	},
	'2021-04-01': {
		Primary: 100,
		Savings: 300,
	},
	'2021-05-01': {
		Primary: 200,
		Savings: 400,
	},
};
