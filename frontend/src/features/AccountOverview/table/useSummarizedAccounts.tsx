import type { Account } from "@/api/generated/src";
import { useSettingsContext } from "@/features/Settings/context";
import type SettingsValues from "@/features/Settings/state";
import { convertToCurrency } from "@/utils/converters";
import { formatDate } from "@/utils/date";
import type { AccountEntries } from "../models/Account";

export function useSummarizedAccounts(
	accounts: Account[],
	entries: AccountEntries,
	date: Date,
	filter: (account: Account) => boolean = () => true,
): number {
	const { values } = useSettingsContext();

	return summarizedAccounts(accounts, entries, date, values, filter);
}

export function summarizedAccounts(
	accounts: Account[],
	entries: AccountEntries,
	date: Date,
	{ currencyRates, preferredDisplayCurrency }: SettingsValues,
	filter: (account: Account) => boolean = () => true,
): number {
	return accounts
		.filter(filter)
		.map((account) =>
			convertToCurrency(
				entries[formatDate(date)][account.id] ?? 0,
				currencyRates.usd,
				account.currency,
				preferredDisplayCurrency,
			),
		)
		.reduce((sum, value) => sum + value, 0);
}
