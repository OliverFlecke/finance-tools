import { GetServerSideProps } from 'next/types';
import React, { useReducer } from 'react';
import { CurrencyRates, getCurrencies } from '../src/API/currency';
import SEO from '../src/components/SEO';
import Budget from '../src/features/Budget';
import {
	BudgetContext,
	initState,
	reducer,
} from '../src/features/Budget/store';

const BudgetPage: React.FC<{ currencyRates: CurrencyRates }> = ({
	currencyRates,
}) => {
	const [state, dispatch] = useReducer(reducer, initState(currencyRates));

	return (
		<BudgetContext.Provider value={{ state, dispatch }}>
			<SEO title="Budget" />
			<main className="px-4 pt-2">
				<h2>Budget</h2>

				<Budget />
			</main>
		</BudgetContext.Provider>
	);
};

export default BudgetPage;

export const getServerSideProps: GetServerSideProps = async () => {
	const currencyRates = await getCurrencies();

	return {
		props: {
			currencyRates,
		},
	};
};
