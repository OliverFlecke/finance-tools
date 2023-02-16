import { useAuth0 } from '@auth0/auth0-react';
import { apiUrlWithPath, get, post, put } from 'features/apiBase';
import { CurrencySymbol } from 'features/Currency/api';
import { useEffect, useState } from 'react';
import { Account, AccountType } from '../models/Account';

export const useApi = (url: RequestInfo, options?: RequestInit) => {
	const { getAccessTokenSilently } = useAuth0();
	const [state, setState] = useState({
		error: null,
		loading: true,
		data: null,
	});

	useEffect(() => {
		(async () => {
			try {
				// const { audience, scope, ...fetchOptions } = options;
				const accessToken = await getAccessTokenSilently({
					// authorizationParams: { audience, scope },
				});
				const res = await fetch(url, {
					...options,
					headers: {
						...options?.headers,
						// Add the Authorization header to the existing headers
						Authorization: `Bearer ${accessToken}`,
					},
				});
				setState({
					...state,
					data: await res.json(),
					error: null,
					loading: false,
				});
			} catch (error) {
				setState({
					...state,
					// error,
					loading: false,
				});
			}
		})();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return state;
};

export function useAccessToken(): string | undefined {
	const [token, setToken] = useState<string | undefined>();
	const { getAccessTokenSilently, loginWithRedirect } = useAuth0();

	useEffect(() => {
		(async () => {
			try {
				setToken(await getAccessTokenSilently());
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (e: any) {
				if (e.error === 'login_required') {
					loginWithRedirect();
				}
				if (e.error === 'consent_required') {
					loginWithRedirect();
				}
				throw e;
			}
		})();
	}, [getAccessTokenSilently, loginWithRedirect, setToken]);

	return token;
}

// async function useApiWithToken(uri: RequestInfo): Promise<Response> {
// 	console.log('useApiWithtoken');
// 	const token = await useToken();
// 	console.log(`Token: ${token}`);

// 	return fetch(uri, {
// 		method: 'GET',
// 		mode: 'cors',
// 		headers: {
// 			Authentication: `Bearer ${token}`,
// 		},
// 	});
// }

export async function getAccounts(
	accessToken: string
): Promise<AccountResponse[]> {
	console.log('useAccountEntries');
	try {
		const response = await fetch(`${apiUrlWithPath}/account`, {
			method: 'GET',
			mode: 'cors',
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		const content = await response.json();

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return content.map((x: any) => ({
			...x,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			entries: x.entries.map((entry: any) => ({
				...entry,
				date: new Date(Date.parse(entry.date)),
			})),
		}));
	} catch (error) {
		console.error(error);
		console.warn("Failed to get user's accounts");
		return [];
	}
}

export async function getAccountsWithEntries(): Promise<AccountResponse[]> {
	// if (useSampleData) return Promise.resolve(sampleData);

	try {
		const response = await get(`${apiUrlWithPath}/account`);
		const content = await response.json();

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return content.map((x: any) => ({
			...x,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			entries: x.entries.map((entry: any) => ({
				...entry,
				date: new Date(Date.parse(entry.date)),
			})),
		}));
	} catch (error) {
		console.warn("Failed to get user's accounts");
		return [];
	}
}

export async function addAccount(account: Account): Promise<string> {
	return await post(`${apiUrlWithPath}/account`, account).then(res =>
		res.json()
	);
}

export async function updateEntry(
	entry: AddAccountEntryRequest
): Promise<void> {
	await post(`${apiUrlWithPath}/account/entry`, entry);
}

export async function updateAccounts(
	accounts: UpdateAccount[]
): Promise<Response> {
	return put(`${apiUrlWithPath}/account`, accounts);
}

export interface AccountResponse {
	id: string;
	name: string;
	type: AccountType;
	entries: EntryResponse[];
	currency: CurrencySymbol;
	sortKey: number;
}

interface EntryResponse {
	date: Date;
	amount: number;
}

interface AddAccountEntryRequest {
	accountId: string;
	date: string; // Must be a DateOnly formatted string
	amount: number;
}

interface UpdateAccount {
	id: string;
	name?: string;
	type?: AccountType;
	currency?: string;
	sortKey?: number;
}
