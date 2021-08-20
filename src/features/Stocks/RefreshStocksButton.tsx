import { Button } from '@oliverflecke/components-react';
import React, { useCallback, useContext } from 'react';
import { IoReload } from 'react-icons/io5';
import { getShares } from './API/yahoo';
import { StockContext } from './state';

const RefreshStocksButton: React.FC = () => {
	const { state, dispatch } = useContext(StockContext);
	const reload = useCallback(async () => {
		try {
			const quotes = await getShares(...state.stocks.map((x) => x.symbol));
			dispatch({ type: 'UPDATE STOCKS', stocks: quotes });
		} catch (err) {
			// TODO: Display error to user
			console.error(err);
		}
	}, [state.stocks, dispatch]);

	return (
		<Button onClick={reload} className="btn btn-primary space-x-2">
			<IoReload aria-label="Reload current stock prices" className="inline" />
			<span className="align-middle">Refresh stocks</span>
		</Button>
	);
};

export default RefreshStocksButton;
