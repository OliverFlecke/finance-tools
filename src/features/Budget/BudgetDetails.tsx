import React, { FC, useCallback, useContext } from 'react';
import { useComputation } from './useComputation';
import ItemList from './ItemList';
import MonthAndYearCells from './MonthAndYearCells';
import { AddItemToBudgetRequest, BudgetWithItems } from './api';
import { BudgetContext } from './state';
import { getBackgroundColorValueIndicator } from 'utils/colors';

const BudgetDetails: FC<{
	budget: BudgetWithItems;
	savePercent: number;
}> = ({ budget, savePercent }) => {
	const { dispatch } = useContext(BudgetContext);
	const {
		income,
		expenses,
		total,
		totalIncome,
		totalExpenses,
		savings,
		remaining,
	} = useComputation(budget, { savePercent });

	const deleteItem = useCallback(
		(item_id: string) => {
			dispatch({ type: 'REMOVE ITEM', budget_id: budget.id, item_id });
		},
		[budget.id, dispatch]
	);
	const updateItem = useCallback(
		(item_id: string, item: AddItemToBudgetRequest) => {
			dispatch({ type: 'EDIT ITEM', item_id, item });
		},
		[dispatch]
	);
	const addItem = useCallback(
		(item: AddItemToBudgetRequest) =>
			dispatch({
				type: 'ADD INCOME',
				budget_id: budget.id,
				item,
			}),
		[budget.id, dispatch]
	);
	const addExpense = useCallback(
		(item: AddItemToBudgetRequest) => {
			item.amount = -item.amount;
			dispatch({
				type: 'ADD EXPENSE',
				budget_id: budget.id,
				item,
			});
		},
		[budget.id, dispatch]
	);

	return (
		<div className="mx-4 pb-8">
			<table className="w-full border-separate border-spacing-0 overflow-hidden rounded">
				<thead>
					<tr className="text-right">
						<th className="px-2"></th>
						<th className="px-2">Per month</th>
						<th className="px-2">Per year</th>
					</tr>
				</thead>

				<ItemList
					title="Income"
					items={income}
					total={totalIncome}
					addItem={addItem}
					deleteItem={deleteItem}
					updateItem={updateItem}
				/>

				<ItemList
					title="Expenses"
					items={expenses}
					total={totalExpenses}
					addItem={addExpense}
					deleteItem={deleteItem}
					updateItem={updateItem}
				/>

				<tfoot className="bg-sky-300 dark:bg-sky-900">
					<tr className={getBackgroundColorValueIndicator(total)}>
						<th className="px-4 py-1 text-left">After monthley expenses</th>
						<MonthAndYearCells value={total} />
						<td></td>
					</tr>
					<tr>
						<td className="px-4 py-1 text-left">Savings</td>
						<MonthAndYearCells value={savings} />
						<td></td>
					</tr>
					<tr className={getBackgroundColorValueIndicator(remaining)}>
						<th className="px-4 py-1 text-left">Remaining</th>
						<MonthAndYearCells value={remaining} />
						<td></td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
};

export default BudgetDetails;
