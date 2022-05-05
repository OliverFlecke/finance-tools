import { useCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export function parseNumber(value: any): number {
	return Number.parseFloat(value.toString().replace(/[,a-zA-Z]/g, ''));
}

export const currencyFormatter = Intl.NumberFormat(undefined, {
	style: 'currency',
	currency: 'DKK',
	currencyDisplay: 'code',
});

export function formatCurrency(value?: number, currency?: string): string {
	if (!value || Number.isNaN(value)) return '0';
	const format = (currency: string) =>
		value.toLocaleString(undefined, {
			style: 'currency',
			currency,
			currencyDisplay: 'code',
		});

	try {
		return format(currency ?? 'USD');
	} catch (ex) {
		if (ex instanceof RangeError && ex.message.startsWith('Invalid currency code') && currency) {
			return format('USD').replace('USD', currency);
		}

		return value.toString();
	}
}

export function convertToCurrency(
	value: number,
	fromCurrency?: string,
	toCurrency?: string,
	rates?: Rates
): number {
	return value * getConversionRate(fromCurrency, toCurrency, rates);
}

export function getConversionRate(
	fromCurrency?: string,
	toCurrency?: string,
	rates?: Rates
): number {
	const baseCurrency = 'usd';
	fromCurrency = fromCurrency?.toLowerCase();
	toCurrency = toCurrency?.toLowerCase();
	rates = rates ?? defaultRates;

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

export function useConverter(
	fromCurrency: string,
	toCurrency: string,
	rates: Rates
): (value: number) => number {
	return useCallback(
		(value: number) => convertToCurrency(value, fromCurrency, toCurrency, rates),
		[fromCurrency, rates, toCurrency]
	);
}

type Rates = { [key: string]: number };

const defaultRates: { [key: string]: number } = {
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
