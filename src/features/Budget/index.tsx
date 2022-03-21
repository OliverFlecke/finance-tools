import React, { useContext, useMemo } from 'react';
import { formatCurrency } from '../../utils/converters';
import BudgetLine from './components/BudgetLine';
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
