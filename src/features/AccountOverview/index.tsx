import AddAccount from 'features/AccountOverview/AddAccountModal';
import React, { memo, useCallback, useEffect, useReducer } from 'react';
import { formatDate } from 'utils/date';
import {
	AccountContext,
	accountReducer,
	initAccountState,
} from './AccountService';
import AddEntryModal from './AddEntryModal';
import { addAccount, getAccountsWithEntries } from './api/accountApi';
import OverviewChart from './OverviewChart';
import { Account, AccountEntries } from './models/Account';
import OrderAccountsModal from './OrderAccountsModal';
import Table from './Table';

const AccountOverview = memo(() => {
	const [state, dispatch] = useReducer(accountReducer, initAccountState());

	useEffect(() => {
		getAccountsWithEntries().then(accounts => {
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

			dispatch({
				type: 'LOAD STATE',
				state: {
					accounts: accounts,
					entries: Object.keys(entries)
						.sort()
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						.reduce((obj: any, key) => {
							obj[key] = entries[key];
							return obj;
						}, {}),
				},
			});
		});
	}, []);

	const add = useCallback(
		async (account: Account) => {
			await addAccount(account);
			dispatch({ type: 'ADD ACCOUNT', account });
		},
		[dispatch]
	);

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

export default AccountOverview;
