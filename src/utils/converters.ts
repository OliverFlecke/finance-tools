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
		value.toLocaleString('en-US', {
			style: 'currency',
			currency,
			currencyDisplay: 'symbol',
		});

	try {
		return format(currency ?? 'USD');
	} catch (ex) {
		if (
			ex instanceof RangeError &&
			ex.message.startsWith('Invalid currency code') &&
			currency
		) {
			return format('USD').replace('USD', currency);
		}

		return value.toString();
	}
}

export function convertToCurrency(
	value: number,
	rates: Rates,
	fromCurrency?: string,
	toCurrency?: string
): number {
	return value * getConversionRate(rates, fromCurrency, toCurrency);
}

export function getConversionRate(
	rates: Rates,
	fromCurrency?: string,
	toCurrency?: string
): number {
	const baseCurrency = 'usd';
	const fromLowered = fromCurrency?.toLowerCase();
	const toLowered = toCurrency?.toLowerCase();
	rates = rates;

	if (!fromLowered || !toLowered || fromLowered === toLowered) {
		return 1;
	}

	if (fromLowered === baseCurrency) {
		if (toCurrency === 'GBp') {
			return rates['gbp'] * 100;
		}
		return toLowered in rates ? rates[toLowered] : 1;
	} else if (toLowered === baseCurrency) {
		if (fromCurrency === 'GBp') {
			return 1 / (rates['gbp'] * 100);
		}
		return fromLowered in rates ? 1 / rates[fromLowered] : 1;
	} else {
		return (
			getConversionRate(rates, fromCurrency, baseCurrency) *
			getConversionRate(rates, baseCurrency, toCurrency)
		);
	}
}

export function useConverter(
	fromCurrency: string,
	toCurrency: string,
	rates: Rates
): (value: number) => number {
	return useCallback(
		(value: number) =>
			convertToCurrency(value, rates, fromCurrency, toCurrency),
		[fromCurrency, rates, toCurrency]
	);
}

type Rates = { [key: string]: number };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sortObject<T>(unordered: any): T {
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
