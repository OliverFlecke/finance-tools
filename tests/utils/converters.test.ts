import { getConversionRate } from '../../src/utils/converters';

const rates = {
	dkk: 6.36,
	nok: 9,
	eur: 0.85,
};

describe('Conversion rate tests', () => {
	test.each([
		['DKK', 6.36],
		['NOK', 9],
		['EUR', 0.85],
	])('Simple conversion rates from USD', (toCurrency, expectedRate) => {
		expect(getConversionRate(rates, 'USD', toCurrency)).toBe(expectedRate);
	});

	test.each([
		['DKK', 0.16],
		['NOK', 0.11],
		['EUR', 1.17],
	])('Simple conversion rate to USD', (fromCurrency, expectedRate) => {
		expect(getConversionRate(rates, fromCurrency, 'USD')).toBeCloseTo(
			expectedRate,
			1
		);
	});

	test.each([
		['DKK', 'NOK', 1.42],
		['NOK', 'DKK', 0.71],
		['DKK', 'EUR', 0.13],
		['EUR', 'DKK', 7.44],
	])(
		'Conversion between two non-base currencies',
		(fromCurrency, toCurrency, expectedRate) => {
			expect(getConversionRate(rates, fromCurrency, toCurrency)).toBeCloseTo(
				expectedRate,
				1
			);
		}
	);
});
