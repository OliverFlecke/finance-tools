import { useMemo } from 'react';
import { sum } from 'utils/math';
import { BudgetWithItems } from './api';

export interface Options {
	savePercent: number;
}

export function useComputation(
	budget: BudgetWithItems,
	{ savePercent }: Options
) {
	const income = useMemo(
		() => budget.items.filter(x => x.amount >= 0),
		[budget.items]
	);
	const expenses = useMemo(
		() => budget.items.filter(x => x.amount < 0),
		[budget.items]
	);
	const totalIncome = useMemo(
		() => sum(...income.map(x => x.amount)),
		[income]
	);
	const totalExpenses = useMemo(
		() => sum(...expenses.map(x => x.amount)),
		[expenses]
	);
	const total = useMemo(
		() => totalIncome - totalExpenses,
		[totalIncome, totalExpenses]
	);
	const savings = totalIncome * (savePercent / 100);

	const remaining = total - savings;

	return {
		income,
		expenses,
		total,
		totalIncome,
		totalExpenses,
		savings,
		remaining,
	};
}
