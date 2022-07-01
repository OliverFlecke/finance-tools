import React, { useCallback, useContext, useState } from 'react';
import {
	AnimatedAxis, // any of these can be non-animated equivalents
	AnimatedGrid,
	AnimatedLineSeries,
	XYChart,
	Tooltip,
	darkTheme,
	lightTheme,
} from '@visx/xychart';
import { AccountContext } from './AccountService';
import useThemeDetector from 'hooks/useThemeDetector';
import { Account } from './models/Account';
import SettingsContext from '../Settings/context';
import { convertToCurrency, formatCurrency } from '../../utils/converters';
import { Toggle } from '@oliverflecke/components-react';

const accessors = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	xAccessor: (d: any) => d.x,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	yAccessor: (d: any) => d.y,
};

const OverviewChart = () => {
	const isDarkTheme = useThemeDetector();
	const { state } = useContext(AccountContext);
	const { values: settings } = useContext(SettingsContext);

	const getEntries = useCallback(
		(account: Account) => {
			return Object.keys(state.entries).map(date => {
				const value = state.entries[date][account.name];
				const y =
					value === undefined
						? undefined
						: convertToCurrency(
								value,
								settings.currencyRates.usd,
								account.currency,
								settings.preferredDisplayCurrency
						  );
				return { x: date, y };
			});
		},
		[settings.currencyRates.usd, settings.preferredDisplayCurrency, state.entries]
	);

	const data = state.accounts.map(account => ({
		account: account,
		data: getEntries(account),
	}));

	const summarize = useCallback(
		(name: string, predicate: (x: { account: Account }) => boolean) => {
			const filteredData = data.filter(predicate).map(x => x.data);
			return {
				name,
				data: Object.keys(state.entries).map((date, i) => ({
					x: date,
					y: filteredData.map(x => x[i].y ?? 0).reduce((sum, v) => sum + v, 0),
				})),
			};
		},
		[data, state.entries]
	);

	const types = ['Cash', 'Investment']
		.map(type => summarize(type, x => x.account.type === type))
		.concat([summarize('Total', () => true)]);

	const [showTotals, setShowTotals] = useState(true);

	return (
		<div className="py-4">
			<div className="flex flex-row justify-end bg-transparent">
				<label className="space-x-4 px-4">
					<span className="h-full align-middle">Show totals</span>
					<Toggle checked={showTotals} onChange={e => setShowTotals(e.target.checked)} />
				</label>
			</div>
			<XYChart
				height={500}
				margin={{ top: 50, bottom: 30, right: 20, left: 70 }}
				xScale={{ type: 'band' }}
				yScale={{ type: 'linear' }}
				theme={isDarkTheme ? darkTheme : lightTheme}
			>
				<AnimatedAxis orientation="bottom" hideAxisLine={true} />
				<AnimatedAxis orientation="left" />
				<AnimatedGrid columns={false} numTicks={4} />

				{showTotals
					? types.map(d => (
							<AnimatedLineSeries key={d.name} dataKey={d.name} data={d.data} {...accessors} />
					  ))
					: data.map(d => (
							<AnimatedLineSeries
								key={d.account.id}
								dataKey={d.account.name}
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
										settings.preferredDisplayCurrency
									)}
								</span>
							</div>
						);
					}}
				/>
			</XYChart>
		</div>
	);
};

export default OverviewChart;
