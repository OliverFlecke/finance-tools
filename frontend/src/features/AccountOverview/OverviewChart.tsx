import { defineChart, lineY } from "@tanstack/charts";
import { Chart } from "@tanstack/charts/react";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";
import { scaleUtc } from "d3-scale";
import { useContext, useMemo, useState } from "react";
import type { Account } from "@/api/generated/types.gen";
import SettingsContext from "@/features/Settings/context";
import { Label } from "@/ui/Label/Label";
import { Toggle } from "@/ui/Toggle/Toggle";
import { convertToCurrency, formatCurrency } from "@/utils/converters";
import { useAccountContext } from "./Context";
import styles from "./OverviewChart.module.css";

interface Row {
	date: Date;
	key: string;
	label: string;
	value: number;
}

const compactNumber = new Intl.NumberFormat(undefined, { notation: "compact" });

const KINDS: { label: string; match: (account: Account) => boolean }[] = [
	{ label: "Cash", match: (account) => account.kind === "Cash" },
	{ label: "Investment", match: (account) => account.kind === "Investment" },
	{ label: "Pension", match: (account) => account.kind === "Pension" },
	{ label: "Total", match: () => true },
];

type RangePreset = "All" | "5Y" | "3Y" | "1Y" | "YTD" | "6M" | "3M" | "1M";

const RANGE_PRESETS: { key: RangePreset; years?: number; months?: number; ytd?: boolean }[] = [
	{ key: "All" },
	{ key: "5Y", years: 5 },
	{ key: "3Y", years: 3 },
	{ key: "1Y", years: 1 },
	{ key: "YTD", ytd: true },
	{ key: "6M", months: 6 },
	{ key: "3M", months: 3 },
	{ key: "1M", months: 1 },
];

function windowForPreset(
	preset: (typeof RANGE_PRESETS)[number],
	extent: readonly [Date, Date],
): { start: Date; end: Date } {
	const end = extent[1];
	let start: Date;
	if (preset.ytd) {
		start = new Date(Date.UTC(end.getUTCFullYear(), 0, 1));
	} else if (preset.years) {
		start = new Date(end);
		start.setUTCFullYear(start.getUTCFullYear() - preset.years);
	} else if (preset.months) {
		start = new Date(end);
		start.setUTCMonth(start.getUTCMonth() - preset.months);
	} else {
		return { start: extent[0], end };
	}
	return { start: start < extent[0] ? extent[0] : start, end };
}

export default function OverviewChart() {
	const { accounts, entries } = useAccountContext();
	const { values: settings } = useContext(SettingsContext);
	const [showTotals, setShowTotals] = useState(true);
	const [preset, setPreset] = useState<RangePreset>("All");

	const definition = useMemo(() => {
		const dates = Object.keys(entries).map((date) => new Date(date));
		const extent: readonly [Date, Date] =
			dates.length > 0 ? [dates[0], dates[dates.length - 1]] : [new Date(), new Date()];
		const activePreset = RANGE_PRESETS.find((p) => p.key === preset) ?? RANGE_PRESETS[0];
		const activeWindow = windowForPreset(activePreset, extent);

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
					return Object.keys(entries).map((date) => ({
						date: new Date(date),
						key: label,
						label,
						value: matching.reduce((sum, account) => sum + (valueFor(account, date) ?? 0), 0),
					}));
				})
			: accounts.flatMap((account) =>
					Object.keys(entries).map((date) => ({
						date: new Date(date),
						key: account.id,
						label: account.name,
						value: valueFor(account, date) ?? 0,
					})),
				);

		const visibleValues = rows
			.filter((row) => row.date >= activeWindow.start && row.date <= activeWindow.end)
			.map((row) => row.value);
		const yDomain: readonly [number, number] = [
			Math.min(0, ...visibleValues),
			Math.max(0, ...visibleValues),
		];

		return defineChart({
			marks: [lineY(rows, { x: "date", y: "value", z: "key" })],
			scales: {
				x: { scale: scaleUtc().domain([activeWindow.start, activeWindow.end]) },
				y: {
					scale: scaleLinear().domain(yDomain),
					nice: true,
					grid: true,
					axis: { ticks: { format: (value) => compactNumber.format(value) } },
				},
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
		preset,
		settings.currencyRates.usd,
		settings.preferredDisplayCurrency,
	]);

	return (
		<div className={styles.container}>
			<Chart ariaLabel="Account balances over time" definition={definition} height={500} />

			<div className={styles.actions}>
				<Label className={styles.toggle}>
					Show totals
					<Toggle checked={showTotals} onChange={(e) => setShowTotals(e.target.checked)} />
				</Label>

				<div aria-label="Date range" className={styles.range_group} role="radiogroup">
					{RANGE_PRESETS.map(({ key }) => (
						<label className={styles.range_option} key={key}>
							<input
								checked={preset === key}
								name="chart-range"
								onChange={() => setPreset(key)}
								type="radio"
								value={key}
							/>
							<span>{key}</span>
						</label>
					))}
				</div>
			</div>
		</div>
	);
}
