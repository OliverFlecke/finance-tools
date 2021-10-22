export type AccountType = 'Cash' | 'Investment';

export interface Account {
	id: string;
	name: string;
	type: AccountType;
}

export type DateEntry = { [key: string]: number };

export type AccountEntries = { [x: string]: DateEntry };
