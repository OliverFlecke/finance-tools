import AddAccount from 'features/AccountOverview/AddAccountModal';
import React, { memo, useCallback, useEffect, useReducer } from 'react';
import { formatDate } from 'utils/date';
import {
	AccountContext,
	accountReducer,
	initAccountState,
} from './AccountService';
import AddEntryModal from './AddEntryModal';
import {
	AccountResponse,
	useAccounts,
	useAddAccountCallback,
} from './api/accountApi';
import OverviewChart from './OverviewChart';
import { Account, AccountEntries } from './models/Account';
import OrderAccountsModal from './OrderAccountsModal';
import Table from './Table';
import { withAuthenticationRequired } from '@auth0/auth0-react';

const AccountOverview = memo(() => {
	const [state, dispatch] = useReducer(accountReducer, initAccountState());

	const accountState = useAccounts();
	useEffect(() => {
		if (!accountState.loading && accountState.data) {
			const accounts = accountState.data;
			dispatch({
				type: 'LOAD STATE',
				state: {
					accounts,
					entries: createAccountEntries(accounts),
				},
			});
		}
	}, [accountState]);

	const addAccountCallback = useAddAccountCallback();
	const add = useCallback(
		async (account: Account) => {
			await addAccountCallback(account);
			dispatch({ type: 'ADD ACCOUNT', account });
		},
		[addAccountCallback]
	);

	if (accountState.loading) {
		// TODO: Spinner
		return <div>Loading data</div>;
	}

	return (
		<AccountContext.Provider value={{ state, dispatch }}>
			<Table />
			<div className="flex flex-row justify-between px-4">
				<AddAccount addAccount={add} />
				<OrderAccountsModal />
				<AddEntryModal />
			</div>
			<OverviewChart />
		</AccountContext.Provider>
	);
});
AccountOverview.displayName = 'AccountOverview';

export default withAuthenticationRequired(AccountOverview, {
	onRedirecting: () => <div>Redirecting you to the login page</div>,
});

function createAccountEntries(accounts: AccountResponse[]): AccountEntries {
	const entries: AccountEntries = {};

	for (const account of accounts) {
		for (const entry of account.entries) {
			const key = formatDate(entry.date);

			if (!(key in entries)) {
				entries[key] = {};
			}

			entries[key][account.name] = entry.amount;
		}
	}
	return (
		Object.keys(entries)
			.sort()
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.reduce((obj: any, key) => {
				obj[key] = entries[key];
				return obj;
			}, {})
	);
}
