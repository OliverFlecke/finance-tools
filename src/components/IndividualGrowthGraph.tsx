import { AxisBottom, AxisLeft } from '@visx/axis';
import { curveLinear } from '@visx/curve';
import { Group } from '@visx/group';
import { LegendItem, LegendLabel, LegendOrdinal } from '@visx/legend';
import { ParentSize } from '@visx/responsive';
import { scaleLinear, scaleTime, scaleOrdinal, TimeDomain } from '@visx/scale';
import { LinePath } from '@visx/shape';
import { extent, max } from 'd3-array';
import { ScaleLinear, ScaleTime, tickFormat } from 'd3-scale';
import events from 'events';
import { Account, DateEntry } from 'models/Account';
import React, { FC, useContext } from 'react';
import { AccountContext } from 'services/AccountService';
import colors from 'tailwindcss/colors';

const IndividualGrowthGraph: FC = () => {
	const { state } = useContext(AccountContext);
	const data = Object.keys(state.entries).map((x) => ({
		date: x,
		value: state.entries[x],
	}));

	const lineColors = [
		colors.amber,
		colors.blueGray,
		colors.green,
		colors.pink,
		colors.yellow,
		colors.rose,
		colors.purple,
		colors.sky,
		colors.indigo,
	];

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
					data.map((x) => max(state.accounts.map((a) => x.value[a.name])) ?? 0) ?? 0
				);
				const yScale = scaleLinear({
					range: [yMax, 0],
					domain: [0, yMaxValue ?? 0],
					nice: true,
				});

				const axisFormat = tickFormat(0, yMaxValue ?? 0, 10, '~s');
				const labelColor = colors.cyan[500];

				const legendScale = scaleOrdinal({
					domain: state.accounts.map((x) => x.name),
					range: state.accounts.map((_, i) => lineColors[i][500]),
				});
				const legendGlyphSize = 15;

				return (
					<div>
						<svg width={width} height={height}>
							<Group top={25} left={65}>
								<AxisLeft
									scale={yScale}
									numTicks={10}
									strokeWidth={1}
									tickFormat={axisFormat}
									stroke={labelColor}
									tickLabelProps={() => ({
										fill: labelColor,
										textAnchor: 'end',
										verticalAnchor: 'middle',
									})}
								/>
								<AxisBottom
									top={yMax}
									left={0}
									numTicks={4}
									scale={xScale}
									stroke={'transparent'}
									tickLabelProps={() => ({
										fill: labelColor,
										textAnchor: 'middle',
										verticalAnchor: 'middle',
									})}
								/>

								{state.accounts.map((account, i) => (
									<AccountLine
										key={account.name}
										account={account}
										color={lineColors[i][500]}
										data={data}
										xScale={xScale}
										yScale={yScale}
									/>
								))}
							</Group>
						</svg>
						<LegendOrdinal scale={legendScale} labelFormat={(label) => `${label.toUpperCase()}`}>
							{(labels) => (
								<div className="flex flex-row flex-wrap">
									{labels.map((label, i) => (
										<LegendItem key={`legend-quantile-${i}`} margin="0 5px">
											<svg width={legendGlyphSize} height={legendGlyphSize}>
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
};

export default IndividualGrowthGraph;

interface AccountLineProps {
	account: Account;
	color: string;
	data: { date: string; value: DateEntry }[];
	yScale: ScaleLinear<number, number, never>;
	xScale: ScaleTime<number, number, never>;
}

const AccountLine = ({ account, color, data, yScale, xScale }: AccountLineProps) => {
	const x = (d: any) => new Date(d.date);
	const y = (d: any) => d.value[account.name];

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
};
