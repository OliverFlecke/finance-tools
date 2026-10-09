import { defineChart, lineY } from "@tanstack/charts";
import { Chart } from "@tanstack/charts/react";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";
import { tooltip } from "@tanstack/charts/tooltip";
import { useContext, useMemo, useState } from "react";
import type { Account } from "@/api/generated/types.gen";
import SettingsContext from "@/features/Settings/context";
import { Toggle } from "@/ui/Toggle/Toggle";
import { convertToCurrency, formatCurrency } from "@/utils/converters";
import { useAccountContext } from "./Context";
import styles from "./OverviewChart.module.css";

interface Row {
	date: string;
	key: string;
	label: string;
	value: number;
}

const KINDS: { label: string; match: (account: Account) => boolean }[] = [
	{ label: "Cash", match: (account) => account.kind === "Cash" },
	{
		label: "Investment",
		match: (account) => account.kind === "Investment" || account.kind === "Pension",
	},
	{ label: "Total", match: () => true },
];

export default function OverviewChart() {
	const { accounts, entries } = useAccountContext();
	const { values: settings } = useContext(SettingsContext);
	const [showTotals, setShowTotals] = useState(true);

	const definition = useMemo(() => {
		const dates = Object.keys(entries);
		const valueFor = (account: Account, date: string) => {
			const value = entries[date][account.id];
			return value === undefined
				? undefined
				: convertToCurrency(
						value,
						settings.currencyRates.usd,
						account.currency,
						settings.preferredDisplayCurrency,
					);
		};

		const rows: Row[] = showTotals
			? KINDS.flatMap(({ label, match }) => {
					const matching = accounts.filter(match);
					return dates.map((date) => ({
						date,
						key: label,
						label,
						value: matching.reduce((sum, account) => sum + (valueFor(account, date) ?? 0), 0),
					}));
				})
			: accounts.flatMap((account) =>
					dates.map((date) => ({
						date,
						key: account.id,
						label: account.name,
						value: valueFor(account, date) ?? 0,
					})),
				);

		return defineChart({
			marks: [lineY(rows, { x: "date", y: "value", z: "key" })],
			scales: {
				x: { scale: () => scalePoint<string>().padding(0.2) },
				y: { scale: scaleLinear, nice: true, grid: true },
			},
			tooltip: {
				use: tooltip,
				items: [
					{ channel: "x", label: "Date" },
					{ field: "label", label: "Account" },
					{
						channel: "y",
						label: "Value",
						text: (point) =>
							formatCurrency(point.yValue as number, settings.preferredDisplayCurrency),
					},
				],
			},
		});
	}, [
		accounts,
		entries,
		showTotals,
		settings.currencyRates.usd,
		settings.preferredDisplayCurrency,
	]);

	return (
		<div className={styles.wrapper}>
			<div className={styles.toggle_row}>
				<span className={styles.toggle_label}>
					<span className={styles.toggle_text}>Show totals</span>
					<Toggle checked={showTotals} onChange={(e) => setShowTotals(e.target.checked)} />
				</span>
			</div>
			<Chart ariaLabel="Account balances over time" definition={definition} height={500} />
		</div>
	);
}
