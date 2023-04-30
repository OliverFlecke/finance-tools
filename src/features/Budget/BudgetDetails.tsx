import React, { FC, useCallback, useContext } from 'react';
import { getBackgroundColorValueIndicator } from 'utils/colors';
import ItemList from './ItemList';
import MonthAndYearCells from './MonthAndYearCells';
import SavingsList from './SavingsList';
import { AddItemToBudgetRequest, BudgetWithItems } from './api';
import { BudgetContext } from './state';
import { useComputation } from './useComputation';

const BudgetDetails: FC<{
	budget: BudgetWithItems;
	savePercent: number;
}> = ({ budget, savePercent }) => {
	const {
		income,
		expenses,
		total,
		totalIncome,
		totalExpenses,
		savings,
		totalSavings,
		remaining,
	} = useComputation(budget, { savePercent });

	const { deleteItem, updateItem, addItem, addExpense, addSavings } =
		useHandlers(budget.id);

	return (
		<div className="mx-4 pb-8">
			<table className="w-full border-separate border-spacing-0 overflow-hidden rounded">
				<Header />

				<ItemList
					title="Income"
					items={income}
					total={totalIncome}
					addItem={addItem}
					deleteItem={deleteItem}
					updateItem={updateItem}
					primaryBackgroundColor="bg-green-200 dark:bg-green-900"
					oddRowBackgroundColor="odd:bg-green-300 dark:odd:bg-green-700"
				/>

				<ItemList
					title="Expenses"
					items={expenses}
					total={totalExpenses}
					addItem={addExpense}
					deleteItem={deleteItem}
					updateItem={updateItem}
					primaryBackgroundColor="bg-red-200 dark:bg-red-900"
					oddRowBackgroundColor="odd:bg-red-300 dark:odd:bg-red-700"
				/>

				<SavingsList
					items={savings}
					addItem={addSavings}
					deleteItem={deleteItem}
					updateItem={updateItem}
				/>

				<Footer
					totalIncome={totalIncome}
					total={total}
					savings={totalSavings}
					remaining={remaining}
				/>
			</table>
		</div>
	);
};

export default BudgetDetails;

const Footer: React.FC<{
	totalIncome: number;
	total: number;
	savings: number;
	remaining: number;
}> = ({ totalIncome, total, savings, remaining }) => (
	<tfoot className="bg-sky-300 dark:bg-sky-900">
		<tr className={getBackgroundColorValueIndicator(total)}>
			<th className="px-4 py-1 text-left">After monthley expenses</th>
			<MonthAndYearCells value={total} />
			<td></td>
		</tr>
		<tr>
			<td className="px-4 py-1 text-left">Savings</td>
			<MonthAndYearCells value={savings} />
			<td className="pr-4 text-right">
				{(100 * (savings / totalIncome)).toFixed(2)} %
			</td>
		</tr>
		<tr
			className={`text-fuchsia-700 underline dark:text-fuchsia-500 ${getBackgroundColorValueIndicator(
				remaining
			)}`}
		>
			<th className="px-4 py-1 text-left">Remaining</th>
			<MonthAndYearCells value={remaining} />
			<td></td>
		</tr>
	</tfoot>
);

const Header = () => (
	<thead>
		<tr className="text-right">
			<th className="px-2"></th>
			<th className="px-2">Per month</th>
			<th className="px-2">Per year</th>
		</tr>
	</thead>
);

function useHandlers(budgetId: string) {
	const { dispatch } = useContext(BudgetContext);

	const deleteItem = useCallback(
		(item_id: string) => {
			dispatch({ type: 'REMOVE ITEM', budget_id: budgetId, item_id });
		},
		[budgetId, dispatch]
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
				budget_id: budgetId,
				item,
			}),
		[budgetId, dispatch]
	);
	const addExpense = useCallback(
		(item: AddItemToBudgetRequest) => {
			item.amount = -item.amount;
			dispatch({
				type: 'ADD EXPENSE',
				budget_id: budgetId,
				item,
			});
		},
		[budgetId, dispatch]
	);

	const addSavings = useCallback(
		(item: AddItemToBudgetRequest) => {
			dispatch({
				type: 'ADD SAVINGS',
				budget_id: budgetId,
				item,
			});
		},
		[budgetId, dispatch]
	);

	return {
		deleteItem,
		updateItem,
		addItem,
		addExpense,
		addSavings,
	};
}
