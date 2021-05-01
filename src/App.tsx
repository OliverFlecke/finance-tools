import React from 'react';
import './compiled.css';
import Table from './components/Table';

const App: React.FC = () => {
	return (
		<main className="dark bg-gray-900 h-screen p-2">
			<header>
				<h1 className="text-xl text-gray-900 dark:text-gray-300 uppercase font-sans font-light">
					Finance tracker
				</h1>
			</header>
			<section className="text-gray-900 dark:text-gray-200">
				<Table />
			</section>
		</main>
	);
};

export default App;
