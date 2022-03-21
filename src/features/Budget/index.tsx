import { CurrencyRates } from '@/API/currency';
import React, { useMemo } from 'react';
import { formatCurrency } from '../../utils/converters';
import { Category } from './category';

interface Props {
	currencyRates: CurrencyRates;
	currency: string;
	income: Category;
	expense: Category;
}

const Budget: React.FC<Props> = ({ currency, income, expense }) => {
	const total = useMemo(
		() => income.amount - expense.amount,
		[expense.amount, income.amount]
	);
	const totalFormatted = useMemo(
		() => formatCurrency(total, currency),
		[currency, total]
	);

	return (
		<>
			<div className="flex flex-row justify-between">
				<span>Monthly total:</span>
				<span className={`${total > 0 ? 'text-green-600' : 'text-red-600'}`}>
					{totalFormatted}
				</span>
			</div>

			<BudgetLine category={income} />
			<BudgetLine category={expense} />
		</>
	);
};

export default Budget;

const BudgetLine: React.FC<{ category: Category }> = ({ category }) => {
	if (category.isLeaf) {
		return <Line category={category} />;
	}

	return (
		<details open={category.isOpen}>
			<summary className="w-full cursor-pointer">
				<Line category={category} />
			</summary>
			<ul className="pl-4">
				{category.children.map((child) => (
					<BudgetLine key={child.name} category={child} />
				))}
			</ul>
		</details>
	);
};

const Line: React.FC<{ category: Category }> = ({ category }) => {
	return (
		<span
			className={`inline-flex flex-row justify-between ${
				category.isLeaf ? 'text-amber-400' : ''
			}`}
			style={{
				width: category.isLeaf ? '100%' : 'calc(100% - 15px)',
			}}
		>
			<span>{category.name}</span>
			<span className="flex flex-row space-x-4">
				<span className="hidden sm:inline space-x-4">
					{/* <Percentage value={category.amount / totalExpenses} />
					<Percentage value={category.amount / totalIncome} /> */}
				</span>
				<span className="w-24 text-right">{category.formatted}</span>
			</span>
		</span>
	);
};

const Percentage: React.FC<{ value: number }> = ({ value }) => {
	return (
		<span className="text-purple-400 w-10 text-right">
			{value.toLocaleString(undefined, { style: 'percent' })}
		</span>
	);
};
