import { DarkModeToggle, useDarkModeWithClass } from '@oliverflecke/components-react';
import 'compiled.css';
import CompoundInterest from 'features/CompoundInterest';
import { AccountOverview } from 'features/AccountOverview';
import React from 'react';
import { useGithubUser } from 'utils/githubAuth';
import LoginState from 'features/login/LoginState';

const App: React.FC = () => {
	const { isDarkMode, setDarkMode } = useDarkModeWithClass();
	const { user, authorizeUrl, logout } = useGithubUser();

	return (
		<main className="h-screen bg-white dark:bg-warmGray-900 text-gray-900 dark:text-gray-200">
			<header className="p-2 flex flex-row justify-between text-gray-300 bg-emerald-900 ">
				<h1 className="p-4 text-xl uppercase font-sans font-light">Finance tracker</h1>
				<div className="flex flex-row justify-center items-center">
					<LoginState user={user} authorizeUrl={authorizeUrl} logout={logout} />
					<div className="p-4">
						<DarkModeToggle darkMode={isDarkMode} onToggle={() => setDarkMode(!isDarkMode)} />
					</div>
				</div>
			</header>

			<section id="account-overview" className="p-4 dark:bg-warmGray-900">
				<AccountOverview />
			</section>

			<section id="compound-interest" className="p-4 dark:bg-warmGray-700">
				<h2 className="text-xl py-4 text-center lg:text-left">Compound interest calculator</h2>
				<CompoundInterest />
			</section>
		</main>
	);
};

export default App;
