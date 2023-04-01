import React, { FC, useCallback, useContext } from 'react';
import DeleteButton from '../../components/DeleteButton';
import {
	Budget,
	useDeleteBudgetCallback,
	useFetchAllBudgets,
	useFetchBudgetWithItemsCallback,
} from './api';
import BudgetCreate from './BudgetCreate';
import { BudgetContext } from './state';

const BudgetList: React.FC = () => {
	const { dispatch } = useContext(BudgetContext);

	const budgets = useFetchAllBudgets();
	const deleteCallback = useDeleteBudgetCallback();
	const fetchBudgetWithItems = useFetchBudgetWithItemsCallback();

	const onSelectBudget = useCallback(
		async (budget: Budget) => {
			const b = await fetchBudgetWithItems(budget.id);
			if (b) {
				dispatch({ type: 'SET BUDGET', budget: b });
			}
		},
		[dispatch, fetchBudgetWithItems]
	);
	const onDelete = useCallback(
		async (id: string) => {
			await deleteCallback(id);
			budgets.refresh();
		},
		[budgets, deleteCallback]
	);

	return (
		<>
			<BudgetCreate onBudgetCreated={budgets.refresh} />

			<div className="bg-cyan-900 p-4">
				<div className="flex w-full flex-row justify-between space-x-4 px-4 font-bold">
					<span>Title</span>
					<span>Created at</span>
					<span></span>
				</div>
				{budgets.data && (
					<ul>
						{budgets.data?.map(b => (
							<BudgetListItem
								key={`${b.title}-${b.created_at.toISOString()}`}
								budget={b}
								deleteCallback={onDelete}
								onSelect={onSelectBudget}
							/>
						))}
					</ul>
				)}
			</div>
		</>
	);
};

export default BudgetList;

const BudgetListItem: FC<{
	budget: Budget;
	onSelect: (budget: Budget) => void;
	deleteCallback: (id: string) => void;
}> = ({ budget, deleteCallback, onSelect }) => (
	<li className="flex w-full flex-row justify-between space-x-4 rounded px-4 odd:bg-slate-200 dark:odd:bg-slate-800">
		<span onClick={() => onSelect(budget)} className="hover:cursor-pointer">
			{budget.title}
		</span>
		<span>{budget.created_at.toDateString()}</span>
		<span>
			<DeleteButton onClick={() => deleteCallback(budget.id)} />
		</span>
	</li>
);