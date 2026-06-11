import { createContext } from 'react'

export function makeContext<TState, TAction>(getDefaultState: () => TState) {
	return createContext({
		state: getDefaultState(),
		// biome-ignore lint/suspicious/noEmptyBlockStatements: default value
		dispatch: (_: TAction) => {},
	})
}
