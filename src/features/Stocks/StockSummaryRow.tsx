import React, { useContext, useMemo } from 'react';
import { convertToCurrency, formatCurrency } from 'utils/converters';
import { sum } from 'utils/math';
import SettingsContext from '../Settings/context';
import { StockList } from './models';

interface StockSummaryRowProps {
	stocks: StockList;
}

const StockSummaryRow: React.FC<StockSummaryRowProps> = ({
	stocks,
}: StockSummaryRowProps) => {
	const {
		values: { preferredDisplayCurrency, currencyRates },
	} = useContext(SettingsContext);

	const totalValue = useMemo(
		() =>
			sum(
				...stocks.flatMap(stock =>
					stock.lots.map(lot =>
						convertToCurrency(
							stock.regularMarketPrice * lot.shares,
							currencyRates.usd,
							stock.currency,
							preferredDisplayCurrency,
						),
					),
				),
			),
		[currencyRates.usd, preferredDisplayCurrency, stocks],
	);
	const totalGain = useMemo(
		() =>
			sum(
				...stocks.flatMap(stock =>
					stock.lots.map(lot =>
						convertToCurrency(
							stock.regularMarketPrice * lot.shares - lot.buyPrice * lot.shares,
							currencyRates.usd,
							stock.currency,
							preferredDisplayCurrency,
						),
					),
				),
			),
		[currencyRates.usd, preferredDisplayCurrency, stocks],
	);

	const gainPercentage = (totalValue / (totalValue - totalGain) - 1) * 100;

	return (
		<tr className="text-right font-bold dark:text-purple-400">
			<td></td>
			<td></td>
			<td>{formatCurrency(totalValue, preferredDisplayCurrency)}</td>
			<td></td>
			<td></td>
			<td>{formatCurrency(totalGain, preferredDisplayCurrency)}</td>
			<td>{gainPercentage.toFixed(2)} %</td>
		</tr>
	);
};

export default StockSummaryRow;
