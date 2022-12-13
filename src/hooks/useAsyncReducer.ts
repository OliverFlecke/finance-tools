import { useState } from 'react';

interface ErrorState {
	error?: unknown;
}

export default function useAsyncReducer<State, Action>(
	reducer: (state: State, action: Action) => Promise<State>,
	initialState: State
): [State & ErrorState, (action: Action) => Promise<void>] {
	const [state, setState] = useState<State & ErrorState>({
		...initialState,
		error: undefined,
	});

	const dispatch = async (action: Action) => {
		reducer(state as State, action)
			.then(state => setState({ ...state, error: undefined }))
			.catch(error => setState({ ...state, error }));
	};

	return [state, dispatch];
}
