import type React from "react";
import { type FC, useReducer } from "react";
import SettingsContext from "./context";
import reducer from "./reducer";
import { initSettings } from "./state";

const Settings: FC<{ children: React.ReactNode }> = ({ children }) => {
	const [values, dispatch] = useReducer(reducer, initSettings());

	return (
		<SettingsContext.Provider value={{ values, dispatch }}>{children}</SettingsContext.Provider>
	);
};

export default Settings;
