// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function parseNumber(value: any): number {
	return Number.parseFloat(value.toString().replace(/[,a-zA-Z]/g, ''));
}

export const currencyFormatter = Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'DKK',
});
