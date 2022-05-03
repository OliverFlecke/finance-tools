import { storedReducer } from 'utils/storage';
import SettingsValues from './state';
import SettingsAction from './actions';

export default storedReducer('settings', reducer);

function reducer(state: SettingsValues, action: SettingsAction): SettingsValues {
	switch (action.type) {
		default:
			console.warn(`Action not handled: ${action.type}`);
			return state;
	}
}
