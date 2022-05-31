import { createContext } from 'react';

export function makeContext<TState, TAction>(getDefaultState: () => TState) {
	return createContext({
		state: getDefaultState(),
		// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
		dispatch: (_: TAction) => {},
	});
}
