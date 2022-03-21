import React, { useContext } from 'react';
import { Category } from '../category';
import { BudgetContext } from '../store';
import { Percentage } from './Percentage';

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

export default Line;
