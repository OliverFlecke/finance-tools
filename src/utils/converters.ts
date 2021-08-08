// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export function parseNumber(value: any): number {
	return Number.parseFloat(value.toString().replace(/[,a-zA-Z]/g, ''));
}

export const currencyFormatter = Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'DKK',
});

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
