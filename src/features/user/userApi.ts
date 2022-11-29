import { User } from 'utils/githubAuth';
import { apiVersion, baseUri } from 'features/apiBase';

export function getMyUser(): Promise<User> {
	if (process.env.NODE_ENV === 'development') {
		return Promise.resolve({
			id: 1,
			avatar_url: 'https://www.kindpng.com/picc/m/52-526237_avatar-profile-hd-png-download.png?',
		});
	}

	return fetch(`${baseUri}/${apiVersion}/user/me`, {
		credentials: 'include',
	})
		.then(res => res.json())
		.catch(err => console.error(err));
}
