import { useDarkModeWithClass } from '@oliverflecke/components-react';
import useThemeDetector from 'hooks/useThemeDetector';
import React, { FC, useEffect, useReducer } from 'react';
import SettingsContext from './context';
import reducer from './reducer';
import { initSettings } from './state';

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
