import { Button, useDarkMode } from '@oliverflecke/components-react';
import React, { useEffect } from 'react';
import './compiled.css';
import AddAccount from './components/AddAccountModal';
import CompoundInterest from './components/CompoundInterest';
import Table from './components/Table';
import AccountService from './services/AccountService';

const accountService = new AccountService();

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
				<h1 className="p-4 text-xl uppercase font-sans font-light">
					Finance tracker
				</h1>
				<Button onClick={() => setDarkMode(!isDarkMode)}>Dark</Button>
			</header>
			<section className="p-4">
				<Table accounts={accountService.getAccounts()} />
				{/* <AddAccount accountService={accountService} /> */}
			</section>

			<section className="p-4 dark:bg-warmGray-700">
				<CompoundInterest />
			</section>
		</main>
	);
};

export default App;
