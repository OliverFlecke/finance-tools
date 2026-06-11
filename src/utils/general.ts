export function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// biome-ignore lint/suspicious/noExplicitAny: this function is used for any object type
export function allPropertiesAreDefined(obj: any): boolean {
	return Object.keys(obj).every((key) => obj[key] !== undefined);
}

export const isClient = typeof window === "undefined";
export const isDevelopment = process.env.NODE_ENV === "development";
