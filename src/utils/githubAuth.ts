import dotenv from 'dotenv';
import { useCallback, useEffect, useMemo, useState } from 'react';
dotenv.config();

const authorizeUrl = 'https://github.com/login/oauth/authorize';
const authCors = process.env.REACT_APP_CORS_AUTH_URL;
const client_id = process.env.REACT_APP_CLIENT_ID;
const localStorageUserKey = 'github_user';
const sessionStorageGithubAuthStateKey = 'github_auth_state';

export interface User {
	id: number;
	avatar_url: string;
	bio: string | null;
	blog: string | null;
	email: string | null;
	html_url: string | null;
	name: string | null;
	login: string | null;
}

export interface AuthorizeResponse {
	access_token: string;
	scopes: string;
	token_type: string;
}

interface UseGithubUserHook {
	user: User | null;
	authorizeUrl: string;
	logout: () => void;
}

export function useGithubUser(): UseGithubUserHook {
	const [user, setUser] = useState<User | null>(null);

	const state = useSessionState(sessionStorageGithubAuthStateKey);
	const url = `${authorizeUrl}?client_id=${client_id}&state=${state}`;
	const logout = useCallback(() => {
		setUser(null);
		localStorage.removeItem(localStorageUserKey);
	}, [setUser]);

	useEffect(() => {
		getUser(state).then(setUser);
	}, [state]);

	return { user, authorizeUrl: url, logout };
}

export function getUser(state: string): Promise<User | null> {
	return new Promise<User | null>((resolve) => {
		const user = getUserFromLocalStorage();
		if (user) {
			resolve(user);
			return;
		}

		const params = new URLSearchParams(window.location.search);
		if (!params.has('code')) {
			resolve(null);
			return;
		}

		if (!params.has('state') || params.get('state') !== state) {
			resolve(null);
			return;
		}

		sessionStorage.removeItem(sessionStorageGithubAuthStateKey);
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const code = params.get('code')!;

		fetch(`${authCors}?code=${code}`, {
			method: 'post',
			headers: {
				Accept: 'application/json',
			},
		})
			.then(async (res) => {
				if (res.status === 200) {
					const body: AuthorizeResponse = await res.json();
					const user = await getUserFromGithub(body.access_token);
					localStorage.setItem('auth_token', JSON.stringify(body));
					localStorage.setItem(localStorageUserKey, JSON.stringify(user));
					resolve(user);
				} else {
					console.warn(`Got unexpected status code: ${res.status}`);
				}

				// Remove query parameters from navigation bar
				window.history.replaceState({}, document.title, window.location.pathname);
			})
			.catch((err) => console.debug(err));
	});
}

function getUserFromGithub(token: string): Promise<User> {
	return fetch('https://api.github.com/user', {
		headers: {
			Authorization: `token ${token}`,
		},
	}).then(async (res) => (await res.json()) as User);
}

function getUserFromLocalStorage(): User | null {
	const content = localStorage.getItem(localStorageUserKey);
	if (!content) return null;

	return JSON.parse(content);
}

function randomString(length: number): string {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	return new Array(length)
		.fill(null)
		.map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
		.reduce((acc, x) => acc + x, '');
}

function useSessionState(key: string): string {
	return useMemo(() => {
		const storedState = sessionStorage.getItem(key);
		if (storedState) {
			return storedState;
		}

		const newState = randomString(32);
		sessionStorage.setItem(key, newState);

		return newState;
	}, [key]);
}
