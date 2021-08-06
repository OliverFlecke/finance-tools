export const authorizeUrl = 'https://github.com/login/oauth/authorize';
const authCors = 'https://gh-finance-tools.herokuapp.com/authorize';

export interface User {
	id: number;
	avatar_user: string;
}

interface AuthorizeResponse {
	access_token: string;
	scopes: string;
	token_type: string;
}

export function getUser(): Promise<User | null> {
	return new Promise<User | null>((resolve) => {
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
				resolve(await getUserFromGithub(body.access_token));
				window.location.search = '';
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
