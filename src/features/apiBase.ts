const isDevelopment = process.env.NODE_ENV === 'development';
export const useSampleData = isDevelopment && false;

const apiVersion = 'api/v1';
export const baseUri = isDevelopment
	? 'https://localhost:5001'
	: 'https://finance.oliverflecke.me';

export const apiUrlWithPath = `${baseUri}/${apiVersion}`;

export function post(uri: RequestInfo, body: unknown): Promise<Response> {
	return helper('POST', uri, body);
}

export function put(uri: RequestInfo, body: unknown): Promise<Response> {
	return helper('PUT', uri, body);
}

function helper(
	method: string,
	uri: RequestInfo,
	body: unknown
): Promise<Response> {
	return fetch(uri, {
		method,
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});
}
