import React, { useCallback, useContext } from 'react';
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
			return Object.keys(state.entries).map(key => {
				const value = state.entries[key][account.name];
				const y =
					value === undefined
						? undefined
						: convertToCurrency(
								value,
								settings.currencyRates.usd,
								account.currency,
								settings.preferredDisplayCurrency
						  );
				return { x: key, y };
			});
		},
		[settings.currencyRates.usd, settings.preferredDisplayCurrency, state.entries]
	);

	const data = state.accounts.map(account => ({
		account: account,
		data: getEntries(account),
	}));

	return (
		<XYChart
			height={500}
			margin={{ top: 50, bottom: 20, right: 20, left: 70 }}
			xScale={{ type: 'band' }}
			yScale={{ type: 'linear' }}
			theme={isDarkTheme ? darkTheme : lightTheme}
		>
			<AnimatedAxis orientation="bottom" hideAxisLine={true} />
			<AnimatedAxis orientation="left" />
			<AnimatedGrid columns={false} numTicks={4} />

			{data.map(d => (
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
	);
};

export default OverviewChart;
