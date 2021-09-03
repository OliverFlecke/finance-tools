import { Reducer } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getDataFromStorage(key: string, defaultValue: any = {}): any {
	const data = localStorage.getItem(key) ?? undefined;
	const parsed = data === undefined || data === '' ? {} : JSON.parse(data);

	return {
		...defaultValue,
		...parsed,
	};
}

export function storedReducer<S, A>(key: string, reducer: Reducer<S, A>): Reducer<S, A> {
	return (state, action) => {
		const newState = reducer(state, action);

		localStorage.setItem(key, JSON.stringify(newState));

		return newState;
	};
}
