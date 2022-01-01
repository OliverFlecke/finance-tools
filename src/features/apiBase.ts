const isDevelopement = process.env.NODE_ENV === 'development';
export const useSampleData = isDevelopement && true;

export const baseUri = isDevelopement
	? 'https://localhost:5001'
	: 'https://finance.oliverflecke.me';

export const apiVersion = 'api/v1';

export function post(uri: RequestInfo, body: unknown): Promise<Response> {
	return fetch(uri, {
		method: 'post',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});
}
