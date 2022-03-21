import { GetServerSideProps } from 'next/types';
import React from 'react';
import SEO from '../src/components/SEO';
import Budget from '../src/features/Budget';
import { CurrencyRates, getCurrencies } from '../src/API/currency';
import data from '../src/features/Budget/uk.json';
import { Category } from '../src/features/Budget/category';

const BudgetPage: React.FC<{ currencyRates: CurrencyRates }> = ({
	currencyRates,
}) => {
	const income = new Category(
		{ currency: data.currency, ...data.income },
		currencyRates
	);
	const expense = new Category(
		{ currency: data.currency, ...data.expense },
		currencyRates
	);

	return (
		<>
			<SEO title="Budget" />
			<main className="px-4 pt-2">
				<h2>Budget</h2>

				<Budget
					currency={data.currency}
					currencyRates={currencyRates}
					expense={expense}
					income={income}
				/>
			</main>
		</>
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
