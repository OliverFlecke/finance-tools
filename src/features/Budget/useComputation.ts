import { useMemo } from 'react';
import { sum } from 'utils/math';
import { BudgetWithItems } from './api';

export interface Options {
	savePercent: number;
}

export function useComputation(budget: BudgetWithItems, {}: Options) {
	const income = useMemo(
		() =>
			budget.items
				.filter(x => x.amount >= 0)
				.filter(x => x.category !== 'Savings'),
		[budget.items]
	);
	const expenses = useMemo(
		() => budget.items.filter(x => x.amount < 0),
		[budget.items]
	);
	const savings = useMemo(
		() => budget.items.filter(x => x.category === 'Savings'),
		[budget.items]
	);

	// TEMP: This is just to hard code the data for now.
	// const savings: Item[] = [
	// 	{
	// 		amount: 400,
	// 		name: 'High yield savings account',
	// 	},
	// 	{
	// 		amount: 1000,
	// 		name: 'ISA S&S',
	// 	},
	// 	{
	// 		amount: 150,
	// 		name: 'ShareSave',
	// 	},
	// ].map((x, i) => ({
	// 	...x,
	// 	category: 'Savings',
	// 	id: i.toString(),
	// 	budget_id: budget.id,
	// 	created_at: new Date(),
	// 	modified_at: new Date(),
	// }));

	const totalIncome = useMemo(
		() => sum(...income.map(x => x.amount)),
		[income]
	);
	const totalExpenses = useMemo(
		() => -sum(...expenses.map(x => x.amount)),
		[expenses]
	);
	const total = useMemo(
		() => totalIncome - totalExpenses,
		[totalIncome, totalExpenses]
	);

	const totalSavings = useMemo(
		() => savings.reduce((acc, item) => acc + item.amount, 0),
		[savings]
	);
	const remaining = total - totalSavings;

	return {
		income,
		expenses,
		savings,
		total,
		totalIncome,
		totalExpenses,
		totalSavings,
		remaining,
	};
}
