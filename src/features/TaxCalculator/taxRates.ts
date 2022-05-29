export type TaxBracket = {
	limit: number;
	rate: number;
};

export type TaxResult = {
	taxes: number;
	after_tax: number;
	pre_tax: number;
};

export type TaxSystem = {
	country: string;
	currency: string;
	taxFreeAllowance: number;
	brackets: TaxBracket[];
	calculate: (income: number) => TaxResult;
};

function addTaxResults(a: TaxResult, b: TaxResult): TaxResult {
	const taxes = a.taxes + b.taxes;
	return {
		taxes,
		pre_tax: a.pre_tax,
		after_tax: a.pre_tax - taxes,
	};
}

function calculateTaxes(amount: number, system: TaxSystem): TaxResult {
	let taxes = 0;
	let after_tax = system.taxFreeAllowance;

	for (let i = 0; i < system.brackets.length; i++) {
		const prev = i === 0 ? system.taxFreeAllowance : system.brackets[i - 1].limit;
		const bracket = system.brackets[i];

		const a = Math.min(amount, bracket.limit) - prev;
		if (a > 0) {
			taxes += a * bracket.rate;
			after_tax += a * (1 - bracket.rate);
		}
	}

	return {
		pre_tax: amount,
		taxes,
		after_tax,
	};
}

export const constants = {
	hours_per_week: 40,
	hours_per_day: 8,
	workdays_per_year: 260,
	vacation_days: 0,
	output_currency: 'DKK',
};

// TODO: These should be editable outside of a new deployment. Preferably stored somewhere in a database and possible made editable to the user
const taxCalculator: { [key: string]: TaxSystem } = {
	uk: {
		country: 'England',
		currency: 'GBP',
		taxFreeAllowance: 12_570,
		brackets: [
			// https://www.gov.uk/income-tax-rates
			{ limit: 50_270, rate: 0.2 },
			{ limit: 150_000, rate: 0.4 },
			{ limit: Infinity, rate: 0.45 },
		],
		calculate: function (income: number) {
			const national_insurance: TaxBracket[] = [
				{ limit: 9568, rate: 0 },
				{ limit: 50_270, rate: 0.135 },
				{ limit: Infinity, rate: 0.02 },
			];
			return addTaxResults(
				calculateTaxes(income, this),
				calculateTaxes(income, { ...this, brackets: national_insurance })
			);
		},
	},
	dk: {
		country: 'Denmark',
		currency: 'DKK',
		taxFreeAllowance: 46_600,
		brackets: [
			// https://www.skat.dk/SKAT.aspx?oId=2035568
			{ limit: 552_500, rate: 0.361 },
			{ limit: Infinity, rate: 0.511 },
		],
		calculate: function (income: number) {
			const AM_rate = 0.08;
			const afterAM = income * (1 - AM_rate);
			const result = calculateTaxes(afterAM, this);
			return {
				...result,
				taxes: result.taxes + income * AM_rate,
			};
		},
	},
	dk_capital: {
		country: 'Denmark Capital',
		currency: 'DKK',
		taxFreeAllowance: 0,
		brackets: [
			{ limit: 56500, rate: 0.27 },
			{ limit: Infinity, rate: 0.42 },
		],
		calculate: function (income: number) {
			return calculateTaxes(income, this);
		},
	},
	us: {
		country: 'United States',
		currency: 'USD',
		calculate: function (income: number) {
			return calculateTaxes(income, this);
		},
		taxFreeAllowance: 0,
		brackets: [
			{ limit: 9_950, rate: 0.1 },
			{ limit: 40_525, rate: 0.12 },
			{ limit: 86_375, rate: 0.22 },
			{ limit: 164_925, rate: 0.24 },
			{ limit: 209_425, rate: 0.32 },
			{ limit: 523_600, rate: 0.35 },
			{ limit: Infinity, rate: 0.37 },
		],
	},
	ca: {
		country: 'Canada',
		currency: 'CAD',
		taxFreeAllowance: 0,
		calculate: function (income: number) {
			const ba_system: TaxSystem = {
				country: 'Canada',
				currency: 'CAD',
				taxFreeAllowance: 0,
				calculate: function (income: number) {
					return calculateTaxes(income, this);
				},
				brackets: [
					{ limit: 43_070, rate: 0.0506 },
					{ limit: 86_141, rate: 0.077 },
					{ limit: 98_901, rate: 0.105 },
					{ limit: 120_094, rate: 0.1229 },
					{ limit: 162_832, rate: 0.147 },
					{ limit: 227_091, rate: 0.168 },
					{ limit: Infinity, rate: 0.205 },
				],
			};

			const country = calculateTaxes(income, this);
			const provincial = ba_system.calculate(income);

			return addTaxResults(country, provincial);
			// return {
			// 	pre_tax: income,
			// 	taxes: country.taxes + provincial.taxes,
			// 	after_tax: income - (country.taxes + provincial.taxes),
			// };
		},
		brackets: [
			{ limit: 50_197, rate: 0.15 },
			{ limit: 100_392, rate: 0.205 },
			{ limit: 155_625, rate: 0.26 },
			{ limit: 221_708, rate: 0.29 },
			{ limit: Infinity, rate: 0.33 },
		],
	},
};

export default taxCalculator;
