import { AuthorizeResponse } from 'utils/githubAuth';
import { StockList } from '../models';

export async function getStocksForUser(): Promise<StockList> {
	const storedAuth = localStorage.getItem('auth_token');
	if (storedAuth === null) return [];

	const auth: AuthorizeResponse = JSON.parse(storedAuth);

	const response = await fetch('https://localhost:5001/api/v1/stock/tracked', {
		// mode: 'cors',
		credentials: 'include',
	});

	console.debug(await response.json());

	return [];
}
