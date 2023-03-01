import React, { FC } from 'react';
import ClientOnly from 'components/ClientOnly';
import { useComputation } from './useComputation';
import { Action } from '.';
import LineOverview from './LineOverview';
import AddLine from './AddLine';
import MonthAndYearCells from './MonthAndYearCells';
import { AddItemToBudgetRequest, BudgetWithItems } from './api';

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

	return (
		<ClientOnly>
			<div className="mx-4 pb-8">
				<table className="w-full border-separate border-spacing-0 overflow-hidden rounded">
					<thead>
						<tr>
							<th></th>
							<th>Per month</th>
							<th>Per year</th>
						</tr>
					</thead>

					<LineOverview title="Income" data={income} total={totalIncome} />
					<AddLine
						add={(item: AddItemToBudgetRequest) =>
							dispatch({
								type: 'ADD INCOME',
								budget_id: budget.id,
								item,
							})
						}
					/>

					<LineOverview
						title="Expenses"
						data={expenses}
						total={totalExpenses}
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
		</ClientOnly>
	);
};

export default BudgetDetails;
