export function sum(...params: number[]): number {
	return params.reduce((acc, x) => acc + x, 0);
}
