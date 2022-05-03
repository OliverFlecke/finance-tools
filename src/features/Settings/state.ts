import { getDataFromStorage } from 'utils/storage';
import { CurrencyRates } from 'features/Currency/api';

export default interface SettingsValues {
	preferredDisplayCurrency: string;
	currencyRates?: CurrencyRates;
}

export function initSettings(): SettingsValues {
	return getDataFromStorage('settings', getDefaultSettings());
}

export function getDefaultSettings(): SettingsValues {
	return {
		preferredDisplayCurrency: 'DKK',
	};
}
