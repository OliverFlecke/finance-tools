import { DarkModeToggle, useDarkModeWithClass } from '@oliverflecke/components-react';
import React, { useEffect } from 'react';
import { AccountOverview } from './AccountOverview';
import './compiled.css';
import CompoundInterest from './components/CompoundInterest';
import { authorizeUrl, getUser } from './utils/githubAuth';

const client_id = 'ceb30c767fecf1ebac0b';

const App: React.FC = () => {
	const { isDarkMode, setDarkMode } = useDarkModeWithClass();

	const state = '1c327c5b-b1f9-470a-9830-cfbb0e37ddce';

	useEffect(() => {
		getUser().then((x) => console.debug(x));
	}, []);

	return (
		<main className="h-screen bg-white dark:bg-warmGray-900 text-gray-900 dark:text-gray-200">
			<header className="p-2 flex flex-row justify-between text-gray-300 bg-emerald-900 ">
				<h1 className="p-4 text-xl uppercase font-sans font-light">Finance tracker</h1>
				<div className="p-4">
					<DarkModeToggle darkMode={isDarkMode} onToggle={() => setDarkMode(!isDarkMode)} />
				</div>
				<a
					className="btn btn-primary"
					href={`${authorizeUrl}?client_id=${client_id}&state=${state}`}
				>
					Login
				</a>
			</header>
			<section className="p-4 dark:bg-warmGray-900">
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
