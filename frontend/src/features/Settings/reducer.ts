import { storedReducer } from "utils/storage";
import type SettingsAction from "./actions";
import type SettingsValues from "./state";

export default storedReducer("settings", reducer);

function reducer(state: SettingsValues, action: SettingsAction): SettingsValues {
	switch (action.type) {
		case "SET CURRENCY RATES":
			return {
				...state,
				currencyRates: action.rates,
			};

		case "SET DISPLAY CURRENCY":
			return {
				...state,
				preferredDisplayCurrency: action.currency,
			};

		case "ADD PREFERRED CURRENCY":
			return {
				...state,
				preferredCurrencies: state.preferredCurrencies.concat(
					state.preferredCurrencies.find((code) => code === action.code) ? [] : [action.code],
				),
			};
		case "REMOVE PREFERRED CURRENCY":
			return {
				...state,
				preferredCurrencies: state.preferredCurrencies.filter((code) => code === action.code),
			};

		default:
			console.warn(`Action not handled: ${action}`);
			return state;
	}
}
