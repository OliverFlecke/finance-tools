import type { CurrencyRates } from "features/Currency/api";
import { getDataFromStorage } from "utils/storage";

export default interface SettingsValues {
	preferredDisplayCurrency: string;
	preferredCurrencies: string[];
	currencyRates: CurrencyRates;
}

export function initSettings(): SettingsValues {
	return getDataFromStorage("settings", getDefaultSettings());
}

export function getDefaultSettings(): SettingsValues {
	return {
		preferredDisplayCurrency: "DKK",
		preferredCurrencies: [],
		currencyRates: { usd: {}, date: new Date().toString() },
	};
}
