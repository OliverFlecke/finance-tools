export type AccountType = 'Cash' | 'Investment';

export interface Account {
	name: string;
	type: AccountType;
}

export type DateEntry = { [key: string]: number };