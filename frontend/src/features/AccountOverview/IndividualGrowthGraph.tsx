/** biome-ignore-all lint/suspicious/noExplicitAny: we allow it here for the graph  */
import { AxisBottom, AxisLeft } from "@visx/axis";
import { curveLinear } from "@visx/curve";
import { Group } from "@visx/group";
import { LegendItem, LegendLabel, LegendOrdinal } from "@visx/legend";
import { ParentSize } from "@visx/responsive";
import { scaleLinear, scaleOrdinal, scaleTime, type TimeDomain } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { extent, max } from "d3-array";
import { type ScaleLinear, type ScaleTime, tickFormat } from "d3-scale";
import type { Account, DateEntry } from "features/AccountOverview/models/Account";
import { useContext } from "react";
import { AccountContext } from "./AccountService";
import styles from "./IndividualGrowthGraph.module.css";

// 500-shade hex values from Tailwind's default palette, used directly since
// the tailwindcss package is no longer a dependency.
const lineColors500 = [
	"#f59e0b", // amber-500
	"#64748b", // slate-500
	"#22c55e", // green-500
	"#ec4899", // pink-500
	"#eab308", // yellow-500
	"#f43f5e", // rose-500
	"#a855f7", // purple-500
	"#0ea5e9", // sky-500
	"#6366f1", // indigo-500
];
const cyan500 = "#06b6d4";

export default function IndividualGrowthGraph() {
	const { state } = useContext(AccountContext);
	const data = Object.keys(state.entries).map((x) => ({
		date: x,
		value: state.entries[x],
	}));

	return (
		<ParentSize>
			{(parent) => {
				const margin = { top: 24, bottom: 24, left: 24, right: 24 };
				const xAxisHeight = 20;
				const width = parent.width;
				const height = 300;

				// Then we'll create some bounds
				const xMax = width - margin.left - margin.right;
				const yMax = height - margin.top - margin.bottom - xAxisHeight;

				const x = (d: any) => new Date(d.date);

				const xScale = scaleTime({
					range: [0, xMax],
					domain: extent(data, x) as TimeDomain,
				});

				const yMaxValue = max(
					data.map((x) => max(state.accounts.map((a) => x.value[a.name])) ?? 0) ?? 0,
				);
				const yScale = scaleLinear({
					range: [yMax, 0],
					domain: [0, yMaxValue ?? 0],
					nice: true,
				});

				const axisFormat = tickFormat(0, yMaxValue ?? 0, 10, "~s");
				const labelColor = cyan500;

				const legendScale = scaleOrdinal({
					domain: state.accounts.map((x) => x.name),
					range: state.accounts.map((_, i) => lineColors500[i]),
				});
				const legendGlyphSize = 15;

				return (
					<div>
						<svg width={width} height={height}>
							<title>Overview chart</title>
							<Group top={25} left={65}>
								<AxisLeft
									scale={yScale}
									numTicks={10}
									strokeWidth={1}
									tickFormat={axisFormat}
									stroke={labelColor}
									tickLabelProps={() => ({
										fill: labelColor,
										textAnchor: "end",
										verticalAnchor: "middle",
									})}
								/>
								<AxisBottom
									top={yMax}
									left={0}
									numTicks={4}
									scale={xScale}
									stroke={"transparent"}
									tickLabelProps={() => ({
										fill: labelColor,
										textAnchor: "middle",
										verticalAnchor: "middle",
									})}
								/>

								{state.accounts.map((account, i) => (
									<AccountLine
										key={account.id}
										account={account}
										color={lineColors500[i]}
										data={data}
										xScale={xScale}
										yScale={yScale}
									/>
								))}
							</Group>
						</svg>
						<LegendOrdinal scale={legendScale} labelFormat={(label) => `${label.toUpperCase()}`}>
							{(labels) => (
								<div className={styles.legend}>
									{labels.map((label) => (
										<LegendItem key={`legend-quantile-${label.text}`} margin="0 5px">
											<svg width={legendGlyphSize} height={legendGlyphSize}>
												<title>{label.text}</title>
												<rect fill={label.value} width={legendGlyphSize} height={legendGlyphSize} />
											</svg>
											<LegendLabel align="left" margin="0 0 0 4px">
												{label.text}
											</LegendLabel>
										</LegendItem>
									))}
								</div>
							)}
						</LegendOrdinal>
					</div>
				);
			}}
		</ParentSize>
	);
}

interface AccountLineProps {
	account: Account;
	color: string;
	data: { date: string; value: DateEntry }[];
	yScale: ScaleLinear<number, number, never>;
	xScale: ScaleTime<number, number, never>;
}

function AccountLine({ account, color, data, yScale, xScale }: AccountLineProps) {
	const x = (d: any) => new Date(d.date);
	const y = (d: any) => d.value[account.id];

	const compose = (scale: any, accessor: any) => (data: any) => scale(accessor(data));
	const xCompose = compose(xScale, x);
	const yCompose = compose(yScale, y);

	const xPoint = (d: any) => xCompose(d) ?? 0;
	const yPoint = (d: any) => yCompose(d) ?? 0;

	return (
		<LinePath
			data={data}
			x={xPoint}
			y={yPoint}
			strokeWidth={1.5}
			stroke={color}
			curve={curveLinear}
		/>
	);
}
