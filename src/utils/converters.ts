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

function getConversionRate(fromCurrency?: string, toCurrency?: string): number {
	if (fromCurrency && fromCurrency in currencyConversionRates) {
		const from = currencyConversionRates[fromCurrency];

		return toCurrency && toCurrency in from ? from[toCurrency] : from.USD;
	}

	return 1;
}

const currencyConversionRates: { [key: string]: { [key: string]: number } } = {
	DKK: {
		USD: 0.16,
	},
	NOK: {
		USD: 0.11,
	},
	EUR: {
		USD: 1.17,
	},
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
