import React, { useContext, useMemo } from 'react';
import { formatCurrency } from '../../utils/converters';
import { Category } from './category';
import { BudgetContext } from './store';

const Budget: React.FC = () => {
	const {
		state: { income, currency, expense },
	} = useContext(BudgetContext);

	const total = useMemo(
		() => income.getAmount() - expense.getAmount(),
		[expense, income]
	);
	const totalFormatted = useMemo(
		() => formatCurrency(total, currency, { maximumFractionDigits: 0 }),
		[currency, total]
	);

	return (
		<div className="space-y-2 divide-y divide-gray-500">
			<section>
				<div className="flex flex-row justify-between">
					<span>Monthly leftover:</span>
					<span className={`${total > 0 ? 'text-green-600' : 'text-red-600'}`}>
						{totalFormatted}
					</span>
				</div>
			</section>

			<section>
				<BudgetLine category={income} />
			</section>
			<section>
				<BudgetLine category={expense} />
			</section>
		</div>
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
				{category.children.map(child => (
					<BudgetLine key={child.name} category={child} />
				))}
			</ul>
		</details>
	);
};

const Line: React.FC<{ category: Category }> = ({ category }) => {
	const {
		state: { income, expense },
		dispatch,
	} = useContext(BudgetContext);
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
				<span className="hidden space-x-4 sm:inline">
					<Percentage
						value={category.getAmount(expense.currency) / expense.getAmount()}
						tooltip="% of total expenses"
					/>
					<Percentage
						value={category.getAmount(income.currency) / income.getAmount()}
						tooltip="% of total income"
					/>
				</span>
				<span className="w-24 text-right">{category.getFormatted()}</span>
				<span>
					<button
						onClick={() => dispatch({ type: 'REMOVE_CATEGORY', category })}
					>
						-
					</button>
				</span>
			</span>
		</span>
	);
};

const Percentage: React.FC<{ value: number; tooltip: string }> = ({
	value,
	tooltip,
}) => {
	return (
		<span className="group relative w-10 text-right text-purple-400">
			{value.toLocaleString(undefined, { style: 'percent' })}
			<span className="tooltip group-hover:visible group-hover:opacity-100">
				{tooltip}
			</span>
		</span>
	);
};
