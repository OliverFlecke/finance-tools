import React, { useMemo } from 'react';
import { useContext } from 'react';
import { convertToCurrency, formatCurrency } from 'utils/converters';
import { sum } from 'utils/math';
import { StockList } from './models';
import { StockContext } from './state';

interface StockSummaryRowProps {
	stocks: StockList;
}

const StockSummaryRow: React.FC<StockSummaryRowProps> = ({ stocks }: StockSummaryRowProps) => {
	const {
		state: { preferredCurrency },
	} = useContext(StockContext);
	const totalValue = useMemo(
		() =>
			sum(
				...stocks.flatMap((stock) =>
					stock.lots.map((lot) =>
						convertToCurrency(
							stock.regularMarketPrice * lot.shares,
							stock.currency,
							preferredCurrency
						)
					)
				)
			),
		[preferredCurrency, stocks]
	);
	const totalGain = useMemo(
		() =>
			sum(
				...stocks.flatMap((stock) =>
					stock.lots.map((lot) =>
						convertToCurrency(
							stock.regularMarketPrice * lot.shares - lot.price * lot.shares,
							stock.currency,
							preferredCurrency
						)
					)
				)
			),
		[preferredCurrency, stocks]
	);

	return (
		<tr className="text-right dark:text-purple-400">
			<td></td>
			<td></td>
			<td>{formatCurrency(totalValue, preferredCurrency)}</td>
			<td></td>
			<td></td>
			<td>{formatCurrency(totalGain, preferredCurrency)}</td>
		</tr>
	);
};

export default StockSummaryRow;
