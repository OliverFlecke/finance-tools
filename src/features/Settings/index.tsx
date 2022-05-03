import React, { FC, useReducer } from 'react';
import reducer from './reducer';
import SettingsContext from './context';
import { initSettings } from './state';

const Settings: FC<{ children: React.ReactNode }> = ({ children }) => {
	const [values, dispatch] = useReducer(reducer, initSettings());

	return (
		<SettingsContext.Provider value={{ values, dispatch }}>{children}</SettingsContext.Provider>
	);
};

export default Settings;
