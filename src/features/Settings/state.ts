import { getDataFromStorage } from 'utils/storage';
import { CurrencyRates } from 'features/Currency/api';

export default interface SettingsValues {
	preferredDisplayCurrency: string;
	preferredCurrencies: string[];
	currencyRates: CurrencyRates;
	themeFollowsOS: boolean;
	preferresDarkMode: boolean;
}

export function initSettings(): SettingsValues {
	return getDataFromStorage('settings', getDefaultSettings());
}

export function getDefaultSettings(): SettingsValues {
	return {
		preferredDisplayCurrency: 'DKK',
		preferredCurrencies: [],
		currencyRates: { usd: {}, date: new Date().toString() },
		themeFollowsOS: true,
		preferresDarkMode: false,
	};
}
