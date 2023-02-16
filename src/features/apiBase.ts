import { isDevelopment } from 'utils/general';

export const useSampleData = isDevelopment;

const apiVersion = 'api/v1';
export const baseUri = isDevelopment
	? 'https://localhost:5001'
	: 'https://finance.oliverflecke.me';

export const apiUrlWithPath = `${baseUri}/${apiVersion}`;

export function get(uri: RequestInfo): Promise<Response> {
	return helper('GET', uri);
}

export function post(uri: RequestInfo, body: unknown): Promise<Response> {
	return helper('POST', uri, body);
}

export function put(uri: RequestInfo, body: unknown): Promise<Response> {
	return helper('PUT', uri, body);
}

function helper(
	method: string,
	uri: RequestInfo,
	body?: unknown
): Promise<Response> {
	return fetch(uri, {
		method,
		mode: isDevelopment ? 'cors' : 'no-cors',
		headers: {
			'Content-Type': 'application/json',
		},
		body: body !== undefined ? JSON.stringify(body) : undefined,
	});
}
