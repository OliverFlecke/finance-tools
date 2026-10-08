import type React from "react";
import { useReducer } from "react";
import SettingsContext from "./context";
import reducer from "./reducer";
import { initSettings } from "./state";

export default function Settings({ children }: { children: React.ReactNode }) {
	const [values, dispatch] = useReducer(reducer, initSettings());

	return (
		<SettingsContext.Provider value={{ values, dispatch }}>{children}</SettingsContext.Provider>
	);
}
