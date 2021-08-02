import { AxisBottom, AxisLeft } from '@visx/axis';
import { curveLinear } from '@visx/curve';
import { Group } from '@visx/group';
import { ParentSize } from '@visx/responsive';
import { scaleLinear, scaleTime, TimeDomain } from '@visx/scale';
import { LinePath } from '@visx/shape';
import { extent, max } from 'd3-array';
import { ScaleLinear, ScaleTime } from 'd3-scale';
import React, { FC, useContext } from 'react';
import { Account, DateEntry } from '../models/Account';
import { AccountContext } from '../services/AccountService';

const IndividualGrowthGraph: FC = () => {
	const { state } = useContext(AccountContext);
	const data = Object.keys(state.entries).map((x) => ({ date: x, value: state.entries[x] }));

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

				return (
					<svg width={width} height={height}>
						<Group top={25} left={65}>
							<AxisLeft scale={yScale} numTicks={4} />
							<AxisBottom top={yMax} left={0} numTicks={4} scale={xScale} />

							{state.accounts.map((account) => (
								<AccountLine
									key={account.name}
									account={account}
									data={data}
									xScale={xScale}
									yScale={yScale}
								/>
							))}
						</Group>
					</svg>
				);
			}}
		</ParentSize>
	);
};

export default IndividualGrowthGraph;

interface AccountLineProps {
	account: Account;
	data: { date: string; value: DateEntry }[];
	yScale: ScaleLinear<number, number, never>;
	xScale: ScaleTime<number, number, never>;
}

const AccountLine = ({ account, data, yScale, xScale }: AccountLineProps) => {
	const x = (d: any) => new Date(d.date);
	const y = (d: any) => d.value[account.name];

	const compose = (scale: any, accessor: any) => (data: any) => scale(accessor(data));
	const xCompose = compose(xScale, x);
	const yCompose = compose(yScale, y);

	const xPoint = (d: any) => xCompose(d) ?? 0;
	const yPoint = (d: any) => yCompose(d) ?? 0;

	return (
		<LinePath data={data} x={xPoint} y={yPoint} strokeWidth={1} stroke="red" curve={curveLinear} />
	);
};
