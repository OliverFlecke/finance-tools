export type CurrencySymbol = string;

export function getCurrencies(currency = 'usd'): Promise<CurrencyRates> {
	return fetch(getUrl(currency)).then(async res => await res.json());
}

export interface CurrencyRates {
	date: string;
	usd: { [key: string]: number };
}

function getUrl(currency: string) {
	return `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.min.json`;
}
