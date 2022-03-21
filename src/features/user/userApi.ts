import { User } from 'utils/githubAuth';
import { apiVersion, baseUri } from 'features/apiBase';

export function getMyUser(): Promise<User> {
	return fetch(`${baseUri}/${apiVersion}/user/me`, {
		credentials: 'include',
	})
		.then((res) => res.json())
		.catch((err) => console.error(err));
}
