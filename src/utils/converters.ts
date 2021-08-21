// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export function parseNumber(value: any): number {
	return Number.parseFloat(value.toString().replace(/[,a-zA-Z]/g, ''));
}

export const currencyFormatter = Intl.NumberFormat(undefined, {
	style: 'currency',
	currency: 'DKK',
	currencyDisplay: 'code',
});

export function formatCurrency(value: number, currency?: string): string {
	if (Number.isNaN(value)) return '-';

	return value.toLocaleString(undefined, {
		style: 'currency',
		currency: currency ?? 'USD',
		currencyDisplay: 'code',
	});
}

export function convertToCurrency(
	value: number,
	fromCurrency?: string,
	toCurrency?: string
): number {
	return value * getConversionRate(fromCurrency, toCurrency);
}

export function getConversionRate(fromCurrency?: string, toCurrency?: string): number {
	const baseCurrency = 'usd';
	fromCurrency = fromCurrency?.toLowerCase();
	toCurrency = toCurrency?.toLowerCase();

	if (!fromCurrency || !toCurrency || fromCurrency === toCurrency) {
		return 1;
	}

	if (fromCurrency === baseCurrency) {
		return toCurrency in rates ? rates[toCurrency] : 1;
	} else if (toCurrency === baseCurrency) {
		return fromCurrency in rates ? 1 / rates[fromCurrency] : 1;
	} else {
		return (
			getConversionRate(fromCurrency, baseCurrency) * getConversionRate(baseCurrency, toCurrency)
		);
	}
}

const rates: { [key: string]: number } = {
	dkk: 6.36,
	nok: 9,
	eur: 0.85,
};

export function sortObject<T>(unordered: T): T {
	return (
		Object.keys(unordered)
			.sort()
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.reduce((obj: { [key: string]: any }, key) => {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				obj[key] = (unordered as any)[key];
				return obj;
			}, {}) as T
	);
}
