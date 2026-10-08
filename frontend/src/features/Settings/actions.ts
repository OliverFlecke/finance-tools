import type { CurrencyRates } from "features/Currency/api";

type SettingsAction =
	| { type: "SET DISPLAY CURRENCY"; currency: string }
	| { type: "ADD PREFERRED CURRENCY"; code: string }
	| { type: "REMOVE PREFERRED CURRENCY"; code: string }
	| { type: "SET CURRENCY RATES"; rates: CurrencyRates };

export default SettingsAction;
