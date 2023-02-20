import React, { FC } from 'react';
import DeleteButton from '../../components/DeleteButton';
import { Budget, useBudgets, useDeleteBudgetCallback } from './api';

const BudgetList = () => {
	const budgets = useBudgets();
	const deleteCallback = useDeleteBudgetCallback();

	console.log(budgets);

	if (budgets.loading) {
		return <div>Loading budgets...</div>;
	}

	return (
		<ul className="bg-cyan-900  p-4">
			{budgets.data?.map(b => (
				<BudgetListItem
					key={`${b.title}-${b.created_at.toISOString()}`}
					budget={b}
					deleteCallback={deleteCallback}
				/>
			))}
		</ul>
	);
};

export default BudgetList;

const BudgetListItem: FC<{
	budget: Budget;
	deleteCallback: (id: string) => void;
}> = ({ budget, deleteCallback }) => (
	<li className="flex w-full flex-grow flex-row justify-between space-x-4 rounded px-4 odd:bg-slate-200 dark:odd:bg-slate-800">
		<span>{budget.title}</span>
		<span>{budget.created_at.toDateString()}</span>
		<span>
			<DeleteButton onClick={() => deleteCallback(budget.id)} />
		</span>
	</li>
);
