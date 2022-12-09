import { getConversionRate } from '../../src/utils/converters';

describe('Conversion rate tests', () => {
	test.each([
		['DKK', 6.36],
		['NOK', 9],
		['EUR', 0.85],
	])('Simple conversion rates from USD', (toCurrency, expectedRate) => {
		expect(getConversionRate('USD', toCurrency)).toBe(expectedRate);
	});

	test.each([
		['DKK', 0.16],
		['NOK', 0.11],
		['EUR', 1.17],
	])('Simple conversion rate to USD', (fromCurrency, expectedRate) => {
		expect(getConversionRate(fromCurrency, 'USD')).toBeCloseTo(expectedRate, 1);
	});

	test.each([
		['DKK', 'NOK', 1.42],
		['NOK', 'DKK', 0.71],
		['DKK', 'EUR', 0.13],
		['EUR', 'DKK', 7.44],
	])(
		'Conversion between two non-base currencies',
		(fromCurrency, toCurrency, expectedRate) => {
			expect(getConversionRate(fromCurrency, toCurrency)).toBeCloseTo(
				expectedRate,
				1
			);
		}
	);
});
