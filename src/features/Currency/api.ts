export function getCurrencies(currency = 'usd'): Promise<CurrencyRates> {
	return fetch(getUrl(currency)).then(async (res) => await res.json());
}

export interface CurrencyRates {
	date: string;
	usd: { [key: string]: number };
}

function getUrl(currency: string) {
	return `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.min.json`;
}
