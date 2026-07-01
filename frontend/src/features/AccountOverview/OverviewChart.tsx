import { Toggle } from "@oliverflecke/components-react";
import {
	AnimatedAxis, // any of these can be non-animated equivalents
	AnimatedGrid,
	AnimatedLineSeries,
	darkTheme,
	lightTheme,
	Tooltip,
	XYChart,
} from "@visx/xychart";
import useThemeDetector from "hooks/useThemeDetector";
import { useCallback, useContext, useState } from "react";
import type { Account } from "@/api/generated/dist";
import SettingsContext from "@/features/Settings/context";
import { convertToCurrency, formatCurrency } from "@/utils/converters";
import { useAccountContext } from "./Context";

const accessors = {
	// biome-ignore lint/suspicious/noExplicitAny: generic
	xAccessor: (d: any) => d.x,
	// biome-ignore lint/suspicious/noExplicitAny: generic
	yAccessor: (d: any) => d.y,
};

export default function OverviewChart() {
	const isDarkTheme = useThemeDetector();
	const { accounts, entries } = useAccountContext();
	const { values: settings } = useContext(SettingsContext);

	const getEntries = useCallback(
		(account: Account) => {
			return Object.keys(entries).map((date) => {
				const value = entries[date][account.id];
				const y =
					value === undefined
						? undefined
						: convertToCurrency(
								value,
								settings.currencyRates.usd,
								account.currency,
								settings.preferredDisplayCurrency,
							);
				return { x: date, y };
			});
		},
		[settings.currencyRates.usd, settings.preferredDisplayCurrency, entries],
	);

	const data = accounts.map((account) => ({
		account: account,
		data: getEntries(account),
	}));

	const summarize = (name: string, predicate: (x: { account: Account }) => boolean) => {
		const filteredData = data.filter(predicate).map((x) => x.data);
		return {
			name,
			data: Object.keys(entries).map((date, i) => ({
				x: date,
				y: filteredData.map((x) => x[i].y ?? 0).reduce((sum, v) => sum + v, 0),
			})),
		};
	};

	const types = ["Cash", "Investment"]
		.map((kind) => summarize(kind, (x) => x.account.kind === kind))
		.concat([summarize("Total", () => true)]);

	const [showTotals, setShowTotals] = useState(true);

	return (
		<div className="py-4">
			<div className="flex flex-row justify-end bg-transparent">
				<span className="space-x-4 px-4">
					<span className="h-full align-middle">Show totals</span>
					<Toggle checked={showTotals} onChange={(e) => setShowTotals(e.target.checked)} />
				</span>
			</div>
			<XYChart
				height={500}
				margin={{ top: 50, bottom: 30, right: 20, left: 70 }}
				xScale={{ type: "band" }}
				yScale={{ type: "linear" }}
				theme={isDarkTheme ? darkTheme : lightTheme}
			>
				<AnimatedAxis orientation="bottom" hideAxisLine={true} />
				<AnimatedAxis orientation="left" />
				<AnimatedGrid columns={false} numTicks={4} />

				{showTotals
					? types.map((d) => (
							<AnimatedLineSeries key={d.name} dataKey={d.name} data={d.data} {...accessors} />
						))
					: data.map((d) => (
							<AnimatedLineSeries
								key={d.account.id}
								dataKey={d.account.id}
								data={d.data}
								{...accessors}
							/>
						))}

				<Tooltip
					snapTooltipToDatumX
					snapTooltipToDatumY
					showVerticalCrosshair
					showSeriesGlyphs
					renderTooltip={({ tooltipData, colorScale }) => {
						if (!tooltipData?.nearestDatum || !colorScale) return;

						return (
							<div className="flex flex-col">
								<div style={{ color: colorScale(tooltipData.nearestDatum.key) }}>
									{tooltipData.nearestDatum.key}
								</div>
								<span>{accessors.xAccessor(tooltipData.nearestDatum.datum)}</span>
								<span className="text-green-700 dark:text-green-500">
									{formatCurrency(
										accessors.yAccessor(tooltipData.nearestDatum.datum),
										settings.preferredDisplayCurrency,
									)}
								</span>
							</div>
						);
					}}
				/>
			</XYChart>
		</div>
	);
}
