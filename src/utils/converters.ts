// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function parseNumber(value: any): number {
	return Number.parseFloat(value.toString().replace(/[,a-zA-Z]/g, ''));
}

export const currencyFormatter = Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'DKK',
});

export function sortObject(unordered: any): any {
	return (
		Object.keys(unordered)
			.sort()
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.reduce((obj: { [key: string]: any }, key) => {
				obj[key] = unordered[key];
				return obj;
			}, {})
	);
}
