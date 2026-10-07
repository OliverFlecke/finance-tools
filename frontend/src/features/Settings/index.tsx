import useThemeDetector from "hooks/useThemeDetector";
import type React from "react";
import { type FC, useEffect, useReducer } from "react";
import { useDarkModeWithClass } from "@/ui/hooks/useDarkModeWithClass";
import SettingsContext from "./context";
import reducer from "./reducer";
import { initSettings } from "./state";

const Settings: FC<{ children: React.ReactNode }> = ({ children }) => {
	const [values, dispatch] = useReducer(reducer, initSettings());

	const { setDarkMode } = useDarkModeWithClass();
	const osTheme = useThemeDetector();

	useEffect(() => {
		setDarkMode(values.themeFollowsOS ? osTheme : values.preferresDarkMode);
	}, [values.preferresDarkMode, values.themeFollowsOS, osTheme, setDarkMode]);

	return (
		<SettingsContext.Provider value={{ values, dispatch }}>{children}</SettingsContext.Provider>
	);
};

export default Settings;
