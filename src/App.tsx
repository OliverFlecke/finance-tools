import 'compiled.css';
import { AccountOverview } from 'features/AccountOverview';
import CompoundInterest from 'features/CompoundInterest';
import Header from 'features/Header';
import React from 'react';
import Stocks from './features/Stocks';

const App: React.FC = () => {
	return (
		<main className="h-screen bg-white dark:bg-coolGray-900 text-gray-900 dark:text-gray-200">
			<Header />

			<section>
				<Stocks />
			</section>

			<hr className="mx-8 border-coolGray-600" />

			<section id="account-overview" className="py-4 space-y-4 dark:bg-coolGray-900">
				<AccountOverview />
			</section>

			<section id="compound-interest" className="p-4 bg-coolGray-200 dark:bg-coolGray-700">
				<h2 className="text-xl py-4 text-center lg:text-left">Compound interest calculator</h2>
				<CompoundInterest />
			</section>
		</main>
	);
};

export default App;
