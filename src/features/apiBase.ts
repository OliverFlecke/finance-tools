const isDevelopement = process.env.NODE_ENV === 'development';

export const baseUri = isDevelopement
	? 'https://localhost:5001'
	: 'https://finance.oliverflecke.me';

export const apiVersion = 'api/v1';
