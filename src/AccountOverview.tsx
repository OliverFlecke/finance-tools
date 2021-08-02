import React, { memo, useReducer } from 'react';
import AddAccount from './components/AddAccountModal';
import AddEntryModal from './components/AddEntryModal';
import FileOptionMenu from './components/FileOptionMenu';
import IndividualGrowthGraph from './components/IndividualGrowthGraph';
import Table from './components/Table';
import { AccountContext, accountReducer, initAccountState } from './services/AccountService';

export const AccountOverview = memo(() => {
	const [state, dispatch] = useReducer(accountReducer, initAccountState());

	return (
		<AccountContext.Provider value={{ state, dispatch }}>
			<Table accounts={state.accounts} entries={state.entries} />
			<div className="py-4 flex flex-row justify-between">
				<AddAccount addAccount={(account) => dispatch({ type: 'add account', account })} />
				<AddEntryModal />
			</div>
			<FileOptionMenu />
			<IndividualGrowthGraph />
		</AccountContext.Provider>
	);
});
AccountOverview.displayName = 'AccountOverview';
