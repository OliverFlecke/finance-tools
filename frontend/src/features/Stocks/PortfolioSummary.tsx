import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import SettingsContext from "features/Settings/context";
import { useContext } from "react";
import { getStockSummaryOptions } from "@/api/generated/@tanstack/react-query.gen";
import type { StockSummary } from "@/api/generated/types.gen";
import { getValueColorIndicator } from "@/utils/colors";
import { convertToCurrency, formatCurrency } from "@/utils/converters";
import styles from "./PortfolioSummary.module.css";

export default function PortfolioSummary() {
	const { data, error, isLoading } = useQuery(getStockSummaryOptions());

	if (isLoading) return null;
	if (error) {
		return <div className={styles.error}>Failed to load portfolio summary</div>;
	}

	const summaries = data?.summaries ?? [];
	if (summaries.length === 0) return null;

	const sorted = [...summaries].sort(
		(a, b) => a.portfolio.localeCompare(b.portfolio) || a.symbol.localeCompare(b.symbol),
	);

	return (
		<div className={styles.wrapper}>
			<h2 className={styles.heading}>Portfolios</h2>

			<table className={styles.table}>
				<thead>
					<tr className={styles.row}>
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

				<Footer data={sorted} />
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
		<tr className={styles.row}>
			<td>{portfolio}</td>
			<td>{symbol}</td>
			<td>
				{quantity.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
			</td>
			<td>{formatCurrency(cost_basis, currency)}</td>
			<td>{formatCurrency(avgCost, currency)}</td>
			<td>{formatCurrency(current_price ?? undefined, currency)}</td>
			<td>{formatCurrency(marketValue, currency)}</td>
			<td className={getValueColorIndicator(realized_profit)}>
				{formatCurrency(realized_profit, currency)}
			</td>
			<td className={clsx(unrealized_profit && getValueColorIndicator(unrealized_profit))}>
				{formatCurrency(unrealized_profit ?? undefined, currency)}
			</td>
		</tr>
	);
}

function Footer({ data }: { data: StockSummary[] }) {
	const {
		values: { currencyRates, preferredDisplayCurrency },
	} = useContext(SettingsContext);

	const toDisplayCurrency = (value: number, currency: string) =>
		convertToCurrency(value, currencyRates.usd, currency, preferredDisplayCurrency);

	const totals = data.reduce(
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
		<tfoot>
			<tr className={styles.footer}>
				<th colSpan={6}>Total ({preferredDisplayCurrency})</th>
				<td>{formatCurrency(totals.marketValue, preferredDisplayCurrency)}</td>
				<td className={getValueColorIndicator(totals.realizedProfit)}>
					{formatCurrency(totals.realizedProfit, preferredDisplayCurrency)}
				</td>
				<td className={getValueColorIndicator(totals.unrealizedProfit)}>
					{formatCurrency(totals.unrealizedProfit, preferredDisplayCurrency)}
				</td>
			</tr>
		</tfoot>
	);
}
