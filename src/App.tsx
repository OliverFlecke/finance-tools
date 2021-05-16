import { Button, useDarkMode } from '@oliverflecke/components-react';
import React, { memo, useEffect, useReducer } from 'react';
import './compiled.css';
import AddAccount from './components/AddAccountModal';
import CompoundInterest from './components/CompoundInterest';
import Table from './components/Table';
import { accountReducer, initAccountState } from './services/AccountService';

const App: React.FC = () => {
	const { isDarkMode, setDarkMode } = useDarkMode();

	useEffect(() => {
		if (isDarkMode) {
			if (!document.body.classList.contains('dark')) {
				document.body.classList.add('dark');
			}
		} else {
			document.body.classList.remove('dark');
		}
	}, [isDarkMode]);

	return (
		<main className="h-screen bg-white dark:bg-warmGray-900 text-gray-900 dark:text-gray-200">
			<header className="p-2 flex flex-row justify-between text-gray-300 bg-emerald-900 ">
				<h1 className="p-4 text-xl uppercase font-sans font-light">Finance tracker</h1>
				<Button onClick={() => setDarkMode(!isDarkMode)}>Dark</Button>
			</header>
			<section className="p-4">
				<AccountOverview />
			</section>

			<section className="p-4 dark:bg-warmGray-700">
				<h2 className="text-xl py-4 text-center lg:text-left">Compound interest calculator</h2>
				<CompoundInterest />
			</section>
		</main>
	);
};

export default App;

const AccountOverview = memo(() => {
	const [state, dispatch] = useReducer(accountReducer, initAccountState());

	return (
		<>
			<Table accounts={state.accounts} entries={state.entries} />
			<div className="py-4 flex flex-row justify-between">
				<AddAccount addAccount={(account) => dispatch({ type: 'add account', account })} />
				<Button buttonType="Primary">Add entry</Button>
			</div>
		</>
	);
});
AccountOverview.displayName = 'AccountOverview';
