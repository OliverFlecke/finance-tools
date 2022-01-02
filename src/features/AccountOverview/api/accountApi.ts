import { apiVersion, baseUri, post, useSampleData } from '../../apiBase';
import { Account, AccountType } from '../models/Account';
import sampleData from './sampleData';

export async function getAccountsWithEntries(): Promise<AccountResponse[]> {
	if (useSampleData) return Promise.resolve(sampleData);

	try {
		const response = await fetch(`${baseUri}/${apiVersion}/account`, {
			method: 'get',
			credentials: 'include',
		});

		const content = await response.json();

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return content.map((x: any) => ({
			...x,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			entries: x.entries.map((entry: any) => ({
				...entry,
				date: new Date(Date.parse(entry.date)),
			})),
		}));
	} catch (error) {
		console.debug(error);
		return [];
	}
}

export async function addAccount(account: Account): Promise<string> {
	return await post(`${baseUri}/${apiVersion}/account`, account).then((res) => res.json());
}

export async function updateEntry(entry: AddAccountEntryRequest): Promise<void> {
	await post(`${baseUri}/${apiVersion}/account/entry`, entry);
}

export interface AccountResponse {
	id: string;
	name: string;
	type: AccountType;
	entries: EntryResponse[];
}

interface EntryResponse {
	date: Date;
	amount: number;
}

interface AddAccountEntryRequest {
	accountId: string;
	date: string; // Must be a DateOnly formatted string
	amount: number;
}
