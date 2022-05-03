import { storedReducer } from 'utils/storage';
import SettingsValues from './state';
import SettingsAction from './actions';

export default storedReducer('settings', reducer);

function reducer(state: SettingsValues, action: SettingsAction): SettingsValues {
	console.debug(`Settings: Handling action ${action.type}`);
	switch (action.type) {
		case 'SET CURRENCY RATES':
			return {
				...state,
				currencyRates: action.rates,
			};
		default:
			console.warn(`Action not handled: ${action.type}`);
			return state;
	}
}
