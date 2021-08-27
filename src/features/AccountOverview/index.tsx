import AddAccount from 'features/AccountOverview/AddAccountModal';
import React, { memo, useReducer } from 'react';
import { AccountContext, accountReducer, initAccountState } from './AccountService';
import AddEntryModal from './AddEntryModal';
import FileOptionMenu from './FileOptionMenu';
import IndividualGrowthGraph from './IndividualGrowthGraph';
import Table from './Table';

const AccountOverview = memo(() => {
	const [state, dispatch] = useReducer(accountReducer, initAccountState());

	return (
		<AccountContext.Provider value={{ state, dispatch }}>
			<Table accounts={state.accounts} entries={state.entries} />
			<div className="px-4 flex flex-row justify-between">
				<AddAccount addAccount={(account) => dispatch({ type: 'add account', account })} />
				<AddEntryModal />
			</div>
			<div className="p-4">
				<FileOptionMenu />
			</div>
			<IndividualGrowthGraph />
		</AccountContext.Provider>
	);
});
AccountOverview.displayName = 'AccountOverview';

export default AccountOverview;
