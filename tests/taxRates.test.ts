import taxCalculator from '../src/features/TaxCalculator/taxRates';

describe('Calculate tax rates for country', () => {
	test.each([
		[100, 0],
		[20_000, 0],
		[30_000, 200],
		[40_000, 550],
		[80_000, 3_350],
		[120_000, 7_950],
		[160_000, 13_950],
		[200_000, 21_150],
		[240_000, 28_750],
		[280_000, 36_550],
		[320_000, 44_550],
		[500_000, 84_150],
		[1_000_000, 199_150],
	])(
		'Calculate Singapore tax rates',
		(income: number, expected_tax: number) => {
			expect(taxCalculator['sg'].calculate(income).taxes).toBeCloseTo(
				expected_tax
			);
		}
	);
});
