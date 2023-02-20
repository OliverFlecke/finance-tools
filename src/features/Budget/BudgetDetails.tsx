import React, { FC } from 'react';
import ClientOnly from 'components/ClientOnly';
import { useComputation } from './useComputation';
import { Action, Line, State } from '.';
import LineOverview from './LineOverview';
import AddLine from './AddLine';
import MonthAndYearCells from './MonthAndYearCells';

const BudgetDetails: FC<{
	state: State;
	dispatch: (action: Action) => Promise<void>;
	savePercent: number;
}> = ({ state, savePercent, dispatch }) => {
	const { total, totalIncome, totalExpenses, savings, remaining } =
		useComputation(state, { savePercent });

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

					<LineOverview
						title="Income"
						data={state.income}
						total={totalIncome}
					/>
					<AddLine
						add={(line: Line) => dispatch({ type: 'ADD INCOME', line })}
					/>

					<LineOverview
						title="Expenses"
						data={state.expenses}
						total={totalExpenses}
					/>
					<AddLine
						add={(line: Line) => dispatch({ type: 'ADD EXPENSE', line })}
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
