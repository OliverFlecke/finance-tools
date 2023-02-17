import { useAuth0 } from '@auth0/auth0-react';
import { useCallback, useEffect, useState } from 'react';
import { isDevelopment } from 'utils/general';

export const useSampleData = false; //isDevelopment;

const apiVersion = 'api/v1';
export const baseUri = isDevelopment
	? 'https://localhost:5001'
	: 'https://finance.oliverflecke.me';

export const apiUrlWithPath = `${baseUri}/${apiVersion}`;

export interface ApiResponse<T> {
	loading: boolean;
	error?: unknown;
	data?: T;
}

export function useApi<T>(
	url: RequestInfo,
	options?: RequestInit,
	mapper?: (data: unknown) => T
): ApiResponse<T> {
	const { getAccessTokenSilently } = useAuth0();
	const [state, setState] = useState<ApiResponse<T>>({
		loading: true,
	});

	useEffect(() => {
		(async () => {
			try {
				const accessToken = await getAccessTokenSilently();
				const res = await fetch(url, {
					...options,
					mode: isDevelopment ? 'cors' : 'no-cors',
					headers: {
						...options?.headers,
						Authorization: `Bearer ${accessToken}`,
					},
				});
				const json = await res.json();
				setState({
					...state,
					data: mapper ? mapper(json) : json,
					error: undefined,
					loading: false,
				});
			} catch (error: unknown) {
				setState({
					...state,
					error,
					loading: false,
				});
			}
		})();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return state;
}

export function useApiCall(
	url: RequestInfo,
	options?: RequestInit
): (body?: unknown) => Promise<Response | undefined> {
	const { getAccessTokenSilently } = useAuth0();

	return useCallback(
		async (body?: unknown) => {
			try {
				const accessToken = await getAccessTokenSilently();
				return await fetch(url, {
					...options,

					mode: isDevelopment ? 'cors' : 'no-cors',
					body: body ? JSON.stringify(body) : undefined,
					headers: {
						'Content-Type': 'application/json',
						...options?.headers,
						Authorization: `Bearer ${accessToken}`,
					},
				});
			} catch (error: unknown) {
				console.error(error);
				return undefined;
			}
		},
		[getAccessTokenSilently, options, url]
	);
}

export function useApiWithUrlCall(): (
	url: RequestInfo,
	options?: RequestInit,
	body?: unknown
) => Promise<Response | undefined> {
	const { getAccessTokenSilently } = useAuth0();

	return useCallback(
		async (url: RequestInfo, options?: RequestInit, body?: unknown) => {
			try {
				const accessToken = await getAccessTokenSilently();
				return await fetch(url, {
					...options,

					mode: isDevelopment ? 'cors' : 'no-cors',
					body: body ? JSON.stringify(body) : undefined,
					headers: {
						'Content-Type': 'application/json',
						...options?.headers,
						Authorization: `Bearer ${accessToken}`,
					},
				});
			} catch (error: unknown) {
				console.error(error);
				return undefined;
			}
		},
		[getAccessTokenSilently]
	);
}
