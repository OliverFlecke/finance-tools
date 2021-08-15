import { Reducer } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getDataFromStorage(key: string, defaultValue: any = {}): any {
	const data = localStorage.getItem(key) ?? undefined;
	return data === undefined || data === '' ? defaultValue : JSON.parse(data);
}

export function storedReducer<S, A>(key: string, reducer: Reducer<S, A>): Reducer<S, A> {
	return (state, action) => {
		const newState = reducer(state, action);

		localStorage.setItem(key, JSON.stringify(newState));

		return newState;
	};
}
