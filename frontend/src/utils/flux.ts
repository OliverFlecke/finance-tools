import { createContext } from "react";

export function makeContext<TState, TAction>(getDefaultState: () => TState) {
	return createContext({
		state: getDefaultState(),
		dispatch: (_: TAction) => {},
	});
}
