import { CurrencyRates } from 'features/Currency/api';

type SettingsAction =
	| { type: 'SET THEME TO FOLLOW OS'; shouldFollowOS: boolean }
	| { type: 'SET THEME'; preferresDarkMode: boolean }
	| { type: 'SET DISPLAY CURRENCY'; currency: string }
	| { type: 'ADD PREFERRED CURRENCY'; code: string }
	| { type: 'REMOVE PREFERRED CURRENCY'; code: string }
	| { type: 'SET CURRENCY RATES'; rates: CurrencyRates };

export default SettingsAction;
