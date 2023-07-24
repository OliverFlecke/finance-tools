import { useCallback, useState } from 'react';

interface ErrorState {
	loading: boolean;
	error: unknown | null;
}

export default function useAsyncReducer<State, Action>(
	reducer: (state: State, action: Action) => Promise<State> | State,
	initialState: State,
	cacheKey?: string,
): [State & ErrorState, (action: Action) => Promise<void>] {
	const [state, setState] = useState<State & ErrorState>({
		...initialState,
		loading: false,
		error: null,
	});

	const cacheState = useCallback(
		(newState: State & ErrorState) => {
			if (cacheKey) {
				localStorage.setItem(cacheKey, JSON.stringify(newState));
			}
			setState(newState);
		},
		[cacheKey, setState],
	);

	const dispatch = useCallback(
		async (action: Action) => {
			const result = reducer(state, action);

			if (result instanceof Promise) {
				setState({ ...state, loading: true, error: null });
				result
					.then(state => cacheState({ ...state, loading: false, error: null }))
					.catch(error => setState({ ...state, loading: false, error }));
			} else {
				cacheState({ ...result, loading: false, error: null });
			}
		},
		[cacheState, reducer, state],
	);

	return [state, dispatch];
}
