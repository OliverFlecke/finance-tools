import { Button, useDarkMode } from '@oliverflecke/components-react';
import React from 'react';
import './compiled.css';
import AddAccount from './components/AddAccountModal';
import Table from './components/Table';
import AccountService from './services/AccountService';

const accountService = new AccountService();

const App: React.FC = () => {
	const { isDarkMode, setDarkMode } = useDarkMode();

	return (
		<main className={`h-screen ${isDarkMode ? 'dark' : ''}`}>
			<header className="p-2 flex flex-row justify-between text-gray-900 bg-white dark:text-gray-300 dark:bg-amber-900 ">
				<h1 className="text-xl uppercase font-sans font-light">
					Finance tracker
				</h1>
				<Button onClick={() => setDarkMode(!isDarkMode)}>Dark</Button>
			</header>
			<section className="h-full text-gray-900 dark:text-gray-200 bg-white dark:bg-indigo-900 p-4">
				<Table accounts={accountService.getAccounts()} />
				<AddAccount accountService={accountService} />
			</section>
		</main>
	);
};

export default App;
