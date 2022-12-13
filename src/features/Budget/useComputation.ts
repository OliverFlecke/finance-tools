import { useMemo } from 'react';
import { sum } from 'utils/math';
import { State } from '.';

export interface Options {
	savePercent: number;
}

export function useComputation(state: State, { savePercent }: Options) {
	const totalIncome = useMemo(
		() => sum(...state.income.map(x => x.amount)),
		[state.income]
	);
	const totalExpenses = useMemo(
		() => sum(...state.expenses.map(x => x.amount)),
		[state.expenses]
	);
	const total = useMemo(
		() => totalIncome - totalExpenses,
		[totalIncome, totalExpenses]
	);
	const savings = totalIncome * (savePercent / 100);

	const remaining = total - savings;

	return {
		total,
		totalIncome,
		totalExpenses,
		savings,
		remaining,
	};
}
