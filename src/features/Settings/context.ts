import React, { createContext } from 'react'
import SettingsAction from './actions'
import SettingsValues, { getDefaultSettings } from './state'

const SettingsContext = createContext<{
	values: SettingsValues
	dispatch: React.Dispatch<SettingsAction>
}>({
	// biome-ignore lint/suspicious/noEmptyBlockStatements: default value
	dispatch: (_: SettingsAction) => {},
	values: getDefaultSettings(),
})

export default SettingsContext
