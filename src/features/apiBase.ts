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

export interface ApiResponseWithActions<T> extends ApiResponse<T> {
	refresh: () => void;
}

export function useApi<T>(
	url: RequestInfo,
	options?: RequestInit
): ApiResponseWithActions<T> {
	const { getAccessTokenSilently } = useAuth0();
	const [state, setState] = useState<ApiResponse<T>>({
		loading: true,
	});

	const execute = useCallback(async () => {
		try {
			setState({
				...state,
				data: undefined,
				error: undefined,
				loading: true,
			});
			const accessToken = await getAccessTokenSilently();
			const res = await fetch(url, {
				...options,
				mode: isDevelopment ? 'cors' : undefined,
				headers: {
					...options?.headers,
					Authorization: `Bearer ${accessToken}`,
				},
			});
			const data = parseJsonWithDate(await res.text());
			setState({
				...state,
				data,
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
		// Ignore changes to state
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		(async () => await execute())();
	}, [execute]);

	return {
		...state,
		refresh: execute,
	};
}

export function useApiCall<T>(
	url: RequestInfo,
	options?: RequestInit
): (body?: T) => Promise<Response | undefined> {
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

					mode: isDevelopment ? 'cors' : undefined,
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseJsonWithDate(data: string): any {
	const reDateDetect = /(\d{4})-(\d{2})-(\d{2})(T(\d{2}):(\d{2}):(\d{2}))?/;
	return JSON.parse(data, (_: string, value: unknown) => {
		if (typeof value == 'string' && reDateDetect.exec(value)) {
			return new Date(value);
		}
		return value;
	});
}
