export function sleep(ms: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function allPropertiesAreDefined(obj: any): boolean {
	return Object.keys(obj).every(key => obj[key] !== undefined);
}

export const isClient = typeof window === 'undefined';
export const isDevelopment = process.env.NODE_ENV === 'development';
