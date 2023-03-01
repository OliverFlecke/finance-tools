import React, { FC, useCallback } from 'react';
import { useComputation } from './useComputation';
import ItemList from './ItemList';
import AddLine from './AddLine';
import MonthAndYearCells from './MonthAndYearCells';
import { AddItemToBudgetRequest, BudgetWithItems } from './api';
import { Action } from './state';

const BudgetDetails: FC<{
	budget: BudgetWithItems;
	dispatch: (action: Action) => Promise<void>;
	savePercent: number;
}> = ({ budget, savePercent, dispatch }) => {
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

	return (
		<div className="mx-4 pb-8">
			<table className="w-full border-separate border-spacing-0 overflow-hidden rounded">
				<thead>
					<tr>
						<th></th>
						<th>Per month</th>
						<th>Per year</th>
					</tr>
				</thead>

				<ItemList
					title="Income"
					items={income}
					total={totalIncome}
					deleteItem={deleteItem}
				/>
				<AddLine
					add={(item: AddItemToBudgetRequest) =>
						dispatch({
							type: 'ADD INCOME',
							budget_id: budget.id,
							item,
						})
					}
				/>

				<ItemList
					title="Expenses"
					items={expenses}
					total={totalExpenses}
					deleteItem={deleteItem}
				/>
				<AddLine
					add={(item: AddItemToBudgetRequest) =>
						dispatch({
							type: 'ADD EXPENSE',
							budget_id: budget.id,
							item,
						})
					}
				/>

				<tfoot>
					<tr className="bg-green-400 dark:bg-green-700">
						<th>After monthley expenses</th>
						<MonthAndYearCells value={total} />
					</tr>
					<tr>
						<td>Savings</td>
						<MonthAndYearCells value={savings} />
					</tr>
					<tr className="bg-green-400 dark:bg-green-700">
						<th>Remaining</th>
						<MonthAndYearCells value={remaining} />
					</tr>
				</tfoot>
			</table>
		</div>
	);
};

export default BudgetDetails;
