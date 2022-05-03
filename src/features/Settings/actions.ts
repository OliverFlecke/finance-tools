import { CurrencyRates } from 'features/Currency/api';

type SettingsAction =
	| { type: 'SET DISPLAY CURRENCY'; currency: string }
	| { type: 'SET CURRENCY RATES'; rates: CurrencyRates };

export default SettingsAction;
