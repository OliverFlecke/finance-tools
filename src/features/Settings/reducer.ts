import { storedReducer } from 'utils/storage';
import SettingsValues from './state';
import SettingsAction from './actions';

export default storedReducer('settings', reducer);

function reducer(state: SettingsValues, action: SettingsAction): SettingsValues {
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

		default:
			console.warn(`Action not handled: ${action}`);
			return state;
	}
}
