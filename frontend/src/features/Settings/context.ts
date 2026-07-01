import type React from "react";
import { createContext, useContext } from "react";
import type SettingsAction from "./actions";
import type SettingsValues from "./state";
import { getDefaultSettings } from "./state";

const SettingsContext = createContext<{
	values: SettingsValues;
	dispatch: React.Dispatch<SettingsAction>;
}>({
	// biome-ignore lint/suspicious/noEmptyBlockStatements: default value
	dispatch: (_: SettingsAction) => {},
	values: getDefaultSettings(),
});

export default SettingsContext;

export function useSettingsContext() {
	return useContext(SettingsContext);
}
