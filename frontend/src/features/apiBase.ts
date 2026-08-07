import type { User } from "oidc-client-ts";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { isDevelopment } from "utils/general";

const apiVersion = "api/v1";
export const baseUri = process.env.NEXT_PUBLIC_API_HOST;

export const apiUrlWithPath = `${baseUri}/${apiVersion}`;

export interface ApiResponse<T> {
	loading: boolean;
	error?: unknown;
	data?: T;
}

export interface ApiResponseWithActions<T> extends ApiResponse<T> {
	refresh: () => void;
}

async function getAccessToken(
	user: User | null | undefined,
	signinSilent: () => Promise<User | null>,
): Promise<string> {
	if (user && !user.expired) {
		return user.access_token;
	}
	const renewedUser = await signinSilent();
	if (!renewedUser) {
		throw new Error("Unable to acquire access token");
	}
	return renewedUser.access_token;
}

export function useApi<T>(url: RequestInfo, options?: RequestInit): ApiResponseWithActions<T> {
	const { user, signinSilent } = useAuth();
	const [state, setState] = useState<ApiResponse<T>>({
		loading: true,
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: we do not want to refresh when state changes, as that causes an infinite loop.
	const execute = useCallback(async () => {
		try {
			setState({
				...state,
				data: undefined,
				error: undefined,
				loading: true,
			});
			const accessToken = await getAccessToken(user, signinSilent);
			const res = await fetch(url, {
				...options,
				mode: isDevelopment ? "cors" : undefined,
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
			console.error(error);
			setState({
				...state,
				error,
				loading: false,
			});
		}
	}, [options, url, user, signinSilent]);

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
	options?: RequestInit,
): (body?: T) => Promise<Response | undefined> {
	const { user, signinSilent } = useAuth();

	return useCallback(
		async (body?: unknown) => {
			try {
				const accessToken = await getAccessToken(user, signinSilent);
				return await fetch(url, {
					...options,

					mode: isDevelopment ? "cors" : undefined,
					body: body ? JSON.stringify(body) : undefined,
					headers: {
						"Content-Type": "application/json",
						...options?.headers,
						Authorization: `Bearer ${accessToken}`,
					},
				});
			} catch (error: unknown) {
				console.error(error);
				return undefined;
			}
		},
		[user, signinSilent, options, url],
	);
}

export function useApiWithUrlCall(): (
	url: RequestInfo,
	options?: RequestInit,
	body?: unknown,
) => Promise<Response | undefined> {
	const { user, signinSilent } = useAuth();

	return useCallback(
		async (url: RequestInfo, options?: RequestInit, body?: unknown) => {
			try {
				const accessToken = await getAccessToken(user, signinSilent);
				return await fetch(url, {
					...options,

					mode: isDevelopment ? "cors" : undefined,
					body: body ? JSON.stringify(body) : undefined,
					headers: {
						"Content-Type": "application/json",
						...options?.headers,
						Authorization: `Bearer ${accessToken}`,
					},
				});
			} catch (error: unknown) {
				console.error(error);
				return undefined;
			}
		},
		[user, signinSilent],
	);
}

// biome-ignore lint/suspicious/noExplicitAny: parsing generic JSON value
export function parseJsonWithDate(data: string): any {
	const reDateDetect = /(\d{4})-(\d{2})-(\d{2})(T(\d{2}):(\d{2}):(\d{2}))?/;
	return JSON.parse(data, (_: string, value: unknown) => {
		if (typeof value === "string" && reDateDetect.exec(value)) {
			return new Date(value);
		}
		return value;
	});
}
