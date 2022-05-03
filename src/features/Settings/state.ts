import { getDataFromStorage } from 'utils/storage';

export default interface SettingsValues {
	preferredDisplayCurrency: string;
}

export function initSettings(): SettingsValues {
	return getDataFromStorage('settings', getDefaultSettings());
}

export function getDefaultSettings(): SettingsValues {
	return {
		preferredDisplayCurrency: 'DKK',
	};
}
