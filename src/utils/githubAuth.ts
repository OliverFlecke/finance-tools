import { useCallback, useEffect, useState } from 'react';
import dotenv from 'dotenv';
dotenv.config();

export const authorizeUrl = 'https://github.com/login/oauth/authorize';
const authCors = process.env.REACT_APP_CORS_AUTH_URL;
const client_id = process.env.REACT_APP_CLIENT_ID;
const localStorageUserKey = 'github_user';

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

interface AuthorizeResponse {
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
	const state = '1c327c5b-b1f9-470a-9830-cfbb0e37ddce';
	const url = `${authorizeUrl}?client_id=${client_id}&state=${state}`;
	const logout = useCallback(() => {
		setUser(null);
		localStorage.removeItem(localStorageUserKey);
	}, [setUser]);

	useEffect(() => {
		getUser().then(setUser);
	}, []);

	return { user, authorizeUrl: url, logout };
}

export function getUser(): Promise<User | null> {
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

		const code = params.get('code');

		fetch(`${authCors}?code=${code}`, {
			method: 'post',
			headers: {
				Accept: 'application/json',
			},
		})
			.then(async (res) => {
				const body: AuthorizeResponse = await res.json();
				const user = await getUserFromGithub(body.access_token);
				localStorage.setItem(localStorageUserKey, JSON.stringify(user));
				resolve(user);

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
