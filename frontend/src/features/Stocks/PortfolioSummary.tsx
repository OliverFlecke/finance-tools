import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import SettingsContext from "features/Settings/context";
import { useContext } from "react";
import { getStockSummaryOptions } from "@/api/generated/@tanstack/react-query.gen";
import type { StockSummary } from "@/api/generated/types.gen";
import { getValueColorIndicator } from "@/utils/colors";
import { convertToCurrency, formatCurrency } from "@/utils/converters";
import styles from "./PortfolioSummary.module.css";

function formatNumber(value?: number | null): string {
	if (value === undefined || value === null || Number.isNaN(value)) return "–";
	return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// `currencyDisplay: "code"` instead of the default "symbol": rows can hold a
// mix of currencies that share a symbol (e.g. $ for USD and SGD), which would
// otherwise read as the same amount.
function formatAmount(value: number | undefined, currency: string): string {
	if (value === undefined || Number.isNaN(value)) return "–";
	return formatCurrency(value, currency, { currencyDisplay: "code" });
}

export default function PortfolioSummary() {
	const { data, error, isLoading } = useQuery(getStockSummaryOptions());
	const {
		values: { currencyRates, preferredDisplayCurrency },
	} = useContext(SettingsContext);

	if (isLoading) return null;
	if (error) {
		return <div className={styles.error}>Failed to load portfolio summary</div>;
	}

	const summaries = data?.summaries ?? [];
	if (summaries.length === 0) return null;

	const sorted = [...summaries].sort(
		(a, b) => a.portfolio.localeCompare(b.portfolio) || a.symbol.localeCompare(b.symbol),
	);

	const toDisplayCurrency = (value: number, currency: string) =>
		convertToCurrency(value, currencyRates.usd, currency, preferredDisplayCurrency);

	const totals = sorted.reduce(
		(acc, summary) => {
			const marketValue =
				summary.current_price !== undefined && summary.current_price !== null
					? summary.quantity * summary.current_price
					: undefined;

			return {
				marketValue:
					marketValue !== undefined
						? acc.marketValue + toDisplayCurrency(marketValue, summary.currency)
						: acc.marketValue,
				realizedProfit:
					acc.realizedProfit + toDisplayCurrency(summary.realized_profit, summary.currency),
				unrealizedProfit:
					summary.unrealized_profit !== undefined && summary.unrealized_profit !== null
						? acc.unrealizedProfit + toDisplayCurrency(summary.unrealized_profit, summary.currency)
						: acc.unrealizedProfit,
			};
		},
		{ marketValue: 0, realizedProfit: 0, unrealizedProfit: 0 },
	);

	return (
		<div className={styles.wrapper}>
			<h2 className={styles.heading}>Portfolios</h2>
			<table className={styles.table}>
				<thead>
					<tr>
						<th>Portfolio</th>
						<th>Symbol</th>
						<th>Shares</th>
						<th>Cost basis</th>
						<th>Avg cost</th>
						<th>Current price</th>
						<th>Market value</th>
						<th>Realized</th>
						<th>Unrealized</th>
					</tr>
				</thead>
				<tbody>
					{sorted.map((summary) => (
						<SummaryRow key={`${summary.portfolio}:${summary.symbol}`} summary={summary} />
					))}
				</tbody>
				<tfoot>
					<tr>
						<th colSpan={6}>Total ({preferredDisplayCurrency})</th>
						<td>{formatAmount(totals.marketValue, preferredDisplayCurrency)}</td>
						<td className={getValueColorIndicator(totals.realizedProfit)}>
							{formatAmount(totals.realizedProfit, preferredDisplayCurrency)}
						</td>
						<td className={getValueColorIndicator(totals.unrealizedProfit)}>
							{formatAmount(totals.unrealizedProfit, preferredDisplayCurrency)}
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
}

function SummaryRow({ summary }: { summary: StockSummary }) {
	const {
		portfolio,
		symbol,
		currency,
		quantity,
		cost_basis,
		realized_profit,
		current_price,
		unrealized_profit,
	} = summary;
	const avgCost = quantity !== 0 ? cost_basis / quantity : undefined;
	const marketValue =
		current_price !== undefined && current_price !== null ? quantity * current_price : undefined;

	return (
		<tr>
			<td>{portfolio}</td>
			<td>{symbol}</td>
			<td>{formatNumber(quantity)}</td>
			<td>{formatAmount(cost_basis, currency)}</td>
			<td>{formatAmount(avgCost, currency)}</td>
			<td>{formatAmount(current_price ?? undefined, currency)}</td>
			<td>{formatAmount(marketValue, currency)}</td>
			<td className={getValueColorIndicator(realized_profit)}>
				{formatAmount(realized_profit, currency)}
			</td>
			<td className={clsx(unrealized_profit && getValueColorIndicator(unrealized_profit))}>
				{formatAmount(unrealized_profit ?? undefined, currency)}
			</td>
		</tr>
	);
}
