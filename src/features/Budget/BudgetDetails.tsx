import React, { FC, useCallback, useContext } from 'react';
import { useComputation } from './useComputation';
import ItemList from './ItemList';
import AddLine from './AddLine';
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
					updateItem={updateItem}
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
					updateItem={updateItem}
				/>
				<AddLine
					add={(item: AddItemToBudgetRequest) => {
						item.amount = -item.amount;
						dispatch({
							type: 'ADD EXPENSE',
							budget_id: budget.id,
							item,
						});
					}}
				/>

				<tfoot>
					<tr className={getBackgroundColorValueIndicator(total)}>
						<th>After monthley expenses</th>
						<MonthAndYearCells value={total} />
						<td></td>
					</tr>
					<tr>
						<td>Savings</td>
						<MonthAndYearCells value={savings} />
						<td></td>
					</tr>
					<tr className={getBackgroundColorValueIndicator(remaining)}>
						<th>Remaining</th>
						<MonthAndYearCells value={remaining} />
						<td></td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
};

export default BudgetDetails;
