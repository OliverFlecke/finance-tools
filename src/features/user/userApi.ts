import { User } from 'utils/githubAuth';
import { apiVersion, baseUri } from 'features/apiBase';

export function getMyUser(): Promise<User> {
	if (process.env.NODE_ENV === 'development') {
		return Promise.resolve({
			id: 1,
			avatar_url: 'https://avatars.githubusercontent.com/u/7227658?v=4',
		});
	}

	return fetch(`${baseUri}/${apiVersion}/user/me`, {
		credentials: 'include',
	})
		.then(res => res.json())
		.catch(err => console.error(err));
}
