import 'compiled.css';
import { AccountOverview } from 'features/AccountOverview';
import CompoundInterest from 'features/CompoundInterest';
import Header from 'features/Header';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Stocks from './features/Stocks';

const App: React.FC = () => {
	return (
		<Router>
			<main className="min-h-screen h-full bg-white dark:bg-coolGray-900 text-gray-900 dark:text-gray-200">
				<Header />

				<Switch>
					<Route path="/stocks">
						<Stocks />
					</Route>
					<Route path="/compound-calculator">
						<CompoundInterest />
					</Route>
					<Route path="/">
						<AccountOverview />
					</Route>
				</Switch>
			</main>
		</Router>
	);
};

export default App;
