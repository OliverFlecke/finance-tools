import { defineChart, lineY } from "@tanstack/charts";
import { controlledSignal } from "@tanstack/charts/interaction/signal";
import { type ZoomXWindow, zoomX } from "@tanstack/charts/interaction/zoom";
import { Chart } from "@tanstack/charts/react";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";
import { scaleUtc } from "d3-scale";
import { useContext, useMemo, useState } from "react";
import type { Account } from "@/api/generated/types.gen";
import SettingsContext from "@/features/Settings/context";
import { Button } from "@/ui/Button/Button";
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
	const [zoomWindow, setZoomWindow] = useState<ZoomXWindow<Date> | null>(null);

	const definition = useMemo(() => {
		const dates = Object.keys(entries).map((date) => new Date(date));
		const extent: readonly [Date, Date] =
			dates.length > 0 ? [dates[0], dates[dates.length - 1]] : [new Date(), new Date()];
		const activeWindow = zoomWindow ?? { start: extent[0], end: extent[1] };

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

		return defineChart({
			marks: [lineY(rows, { x: "date", y: "value", z: "key" })],
			scales: {
				x: { scale: scaleUtc, viewport: { domain: [activeWindow.start, activeWindow.end] } },
				y: {
					scale: scaleLinear,
					nice: true,
					grid: true,
					axis: { ticks: { format: (value) => compactNumber.format(value) } },
				},
			},
			controls: [
				zoomX({
					window: controlledSignal(activeWindow, (next) => setZoomWindow(next)),
					extent,
					ariaLabel: "Zoom account balances over time",
				}),
			],
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
		zoomWindow,
		settings.currencyRates.usd,
		settings.preferredDisplayCurrency,
	]);

	return (
		<div className={styles.wrapper}>
			<div className={styles.toggle_row}>
				{zoomWindow && (
					<Button onClick={() => setZoomWindow(null)} type="button" variant="Secondary">
						Reset zoom
					</Button>
				)}
				<span className={styles.toggle_label}>
					<span className={styles.toggle_text}>Show totals</span>
					<Toggle checked={showTotals} onChange={(e) => setShowTotals(e.target.checked)} />
				</span>
			</div>
			<Chart ariaLabel="Account balances over time" definition={definition} height={500} />
		</div>
	);
}
