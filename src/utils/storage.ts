import { Reducer } from 'react';
import { parseJsonWithDate } from '../features/apiBase';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getDataFromStorage<T>(key: string, defaultValue: T): T {
	if (typeof window === 'undefined') return defaultValue;

	const data = localStorage.getItem(key) ?? undefined;
	const parsed =
		data === undefined || data === '' ? {} : parseJsonWithDate(data);

	return {
		...defaultValue,
		...parsed,
	};
}

export function storedReducer<S, A>(
	key: string,
	reducer: Reducer<S, A>,
): Reducer<S, A> {
	return (state, action) => {
		const newState = reducer(state, action);

		localStorage.setItem(key, JSON.stringify(newState));

		return newState;
	};
}
