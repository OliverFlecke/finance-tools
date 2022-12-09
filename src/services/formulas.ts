export type InterestAccrual = 'Yearly' | 'Monthly';

export function FV(
	P: number,
	A: number,
	r: number,
	year: number,
	n = 12
): number {
	const rate = ratePerPaymentPeriod(r, 1, n);
	const nper = n * year;
	return (
		P * Math.pow(1 + rate, nper) + A * ((Math.pow(1 + rate, nper) - 1) / rate)
	);
}

export function compoundInterest(
	principal: number,
	interestRate: number,
	time: number,
	interestAccrual: InterestAccrual
): number {
	const n = getInterestAccrualPerYear(interestAccrual);
	return principal * Math.pow(1 + interestRate / n, n * time);
}

export function futureValue(
	regularDeposit: number,
	interestRate: number,
	time: number,
	interestAccrual: InterestAccrual,
	numberOfDeposits: number,
	depositsMadeAt: 'beginning' | 'end' = 'end'
): number {
	const n = getInterestAccrualPerYear(interestAccrual);

	return (
		regularDeposit *
		numberOfDeposits *
		(((Math.pow(1 + interestRate / n, n * time) - 1) / (interestRate / n)) *
			(depositsMadeAt === 'end' ? 1 : 1 + interestRate / n))
	);
}

export function ratePerPaymentPeriod(r: number, n: number, p: number): number {
	return Math.pow(1 + r / n, n / p) - 1;
}

function getInterestAccrualPerYear(interestAccrual: InterestAccrual): number {
	switch (interestAccrual) {
		case 'Monthly':
			return 12;

		case 'Yearly':
		default:
			return 1;
	}
}
