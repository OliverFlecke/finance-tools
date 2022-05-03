import React, { createContext } from 'react';
import SettingsAction from './actions';
import SettingsValues, { getDefaultSettings } from './state';

const SettingsContext = createContext<{
	values: SettingsValues;
	dispatch: React.Dispatch<SettingsAction>;
}>({
	// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
	dispatch: (_: SettingsAction) => {},
	values: getDefaultSettings(),
});

export default SettingsContext;
