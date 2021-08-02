import { DarkModeToggle, useDarkModeWithClass } from '@oliverflecke/components-react';
import React from 'react';
import { AccountOverview } from './AccountOverview';
import './compiled.css';
import CompoundInterest from './components/CompoundInterest';

const App: React.FC = () => {
	const { isDarkMode, setDarkMode } = useDarkModeWithClass();

	return (
		<main className="h-screen bg-white dark:bg-warmGray-900 text-gray-900 dark:text-gray-200">
			<header className="p-2 flex flex-row justify-between text-gray-300 bg-emerald-900 ">
				<h1 className="p-4 text-xl uppercase font-sans font-light">Finance tracker</h1>
				<div className="p-4">
					<DarkModeToggle darkMode={isDarkMode} onToggle={() => setDarkMode(!isDarkMode)} />
				</div>
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
