import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { getStockSummaryOptions } from "@/api/generated/@tanstack/react-query.gen";
import type { StockSummary } from "@/api/generated/types.gen";
import { getValueColorIndicator } from "@/utils/colors";
import styles from "./PortfolioSummary.module.css";

function formatNumber(value?: number | null): string {
	if (value === undefined || value === null || Number.isNaN(value)) return "–";
	return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

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
			</table>
		</div>
	);
}

function SummaryRow({ summary }: { summary: StockSummary }) {
	const {
		portfolio,
		symbol,
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
			<td>{formatNumber(cost_basis)}</td>
			<td>{formatNumber(avgCost)}</td>
			<td>{formatNumber(current_price)}</td>
			<td>{formatNumber(marketValue)}</td>
			<td className={getValueColorIndicator(realized_profit)}>{formatNumber(realized_profit)}</td>
			<td className={clsx(unrealized_profit && getValueColorIndicator(unrealized_profit))}>
				{formatNumber(unrealized_profit)}
			</td>
		</tr>
	);
}
