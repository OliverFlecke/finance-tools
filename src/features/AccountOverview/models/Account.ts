import { CurrencySymbol } from 'features/Currency/api';

export type AccountType = 'Cash' | 'Investment';

export interface Account {
	id: string;
	name: string;
	type: AccountType;
	currency: CurrencySymbol;
	sortKey: number;
}

export type DateEntry = { [key: string]: number };

export type AccountEntries = { [x: string]: DateEntry };
