import { Button } from '@oliverflecke/components-react';
import React, { useCallback, useContext } from 'react';
import { IoReload } from 'react-icons/io5';
import { getShares } from './API/yahoo';
import { StockContext } from './state';

const RefreshStocksButton: React.FC = () => {
	const { state, dispatch } = useContext(StockContext);
	const reload = useCallback(async () => {
		const quotes = await getShares(...state.stocks.map((x) => x.symbol));
		dispatch({ type: 'UPDATE STOCKS', stocks: quotes });
	}, [state.stocks, dispatch]);

	return (
		<Button onClick={reload}>
			<IoReload aria-label="Reload current stock prices" />
		</Button>
	);
};

export default RefreshStocksButton;
