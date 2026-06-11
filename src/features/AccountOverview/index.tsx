import { withAuthenticationRequired } from '@auth0/auth0-react'
import AddAccount from 'features/AccountOverview/AddAccountModal'
import React, { memo, useCallback, useEffect, useReducer } from 'react'
import { sortObject } from 'utils/converters'
import { formatDate } from 'utils/date'
import { AccountContext, accountReducer, initAccountState } from './AccountService'
import AddEntryModal from './AddEntryModal'
import { AccountResponse, useAccounts, useAddAccountCallback } from './api/accountApi'
import { Account, AccountEntries } from './models/Account'
import OrderAccountsModal from './OrderAccountsModal'
import OverviewChart from './OverviewChart'
import Table from './Table'

const AccountOverview = memo(() => {
	const [state, dispatch] = useReducer(accountReducer, initAccountState())

	const accountState = useAccounts()
	// biome-ignore lint/correctness/useExhaustiveDependencies: we don't want to refresh here automatically
	useEffect(() => {
		if (!accountState.loading && accountState.data) {
			const accounts = accountState.data
			dispatch({
				type: 'LOAD STATE',
				state: {
					accounts,
					entries: createAccountEntries(accounts),
				},
			})
		}
	}, [accountState.loading])

	const addAccountCallback = useAddAccountCallback()
	const add = useCallback(
		async (account: Account) => {
			await addAccountCallback(account)
			dispatch({ type: 'ADD ACCOUNT', account })
		},
		[addAccountCallback],
	)

	if (accountState.loading) {
		// TODO: Spinner
		return <div>Loading data</div>
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
	)
})
AccountOverview.displayName = 'AccountOverview'

export default withAuthenticationRequired(AccountOverview, {
	onRedirecting: () => <div>Redirecting you to the login page</div>,
})

function createAccountEntries(accounts: AccountResponse[]): AccountEntries {
	const entries: AccountEntries = {}

	for (const account of accounts) {
		for (const entry of account.entries) {
			const key = formatDate(entry.date)

			if (!(key in entries)) {
				entries[key] = {}
			}

			entries[key][account.name] = entry.amount
		}
	}

	return sortObject(entries)
}
