import { useSettingsContext } from "@/features/Settings/context";
import { convertToCurrency } from "@/utils/converters";
import { Account, AccountEntries } from "../models/Account";

export function useSummarizedAccounts(
	accounts: Account[],
	entries: AccountEntries,
	date: string,
	filter: (account: Account) => boolean = () => true,
): number {
	const {
		values: { currencyRates, preferredDisplayCurrency },
	} = useSettingsContext();

	return accounts
		.filter(filter)
		.map((account) =>
			convertToCurrency(
				entries[date][account.name] ?? 0,
				currencyRates.usd,
				account.currency,
				preferredDisplayCurrency,
			),
		)
		.reduce((sum, value) => sum + value, 0);
}
