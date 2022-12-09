import { storedReducer } from 'utils/storage';
import SettingsAction from './actions';
import SettingsValues from './state';

export default storedReducer('settings', reducer);

function reducer(
	state: SettingsValues,
	action: SettingsAction
): SettingsValues {
	switch (action.type) {
		case 'SET CURRENCY RATES':
			return {
				...state,
				currencyRates: action.rates,
			};

		case 'SET DISPLAY CURRENCY':
			return {
				...state,
				preferredDisplayCurrency: action.currency,
			};

		case 'SET THEME':
			return {
				...state,
				preferresDarkMode: action.preferresDarkMode,
			};
		case 'SET THEME TO FOLLOW OS':
			return {
				...state,
				themeFollowsOS: action.shouldFollowOS,
			};

		default:
			console.warn(`Action not handled: ${action}`);
			return state;
	}
}
