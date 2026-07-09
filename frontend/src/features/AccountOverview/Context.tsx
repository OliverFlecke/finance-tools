import { createContext, type PropsWithChildren, useContext, useState } from "react";
import { useAccounts } from "@/api/account";
import type { Account } from "@/api/generated/dist";
import { sortObject } from "@/utils/converters";
import { formatDate } from "@/utils/date";
import type { AccountEntries } from "./models/Account";

export default function AccountContext({ children }: PropsWithChildren) {
	const { data, error } = useAccounts();
	const [entries, setEntries] = useState<AccountEntries>({});
	const addEntry = (date: string) => setEntries((x) => ({ ...x, [date]: {} }));

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (!data) {
		return <div>Loading data</div>;
	}

	return (
		<Context.Provider
			value={{
				accounts: data.accounts,
				entries: createAccountEntries(data.accounts, entries),
				addEntry,
			}}
		>
			{children}
		</Context.Provider>
	);
}

interface AccountContextProps {
	accounts: Account[];
	entries: AccountEntries;
	addEntry: (date: string) => void;
}

// biome-ignore lint/style/noNonNullAssertion: Data will always be provided in AccountContext which is not exposed outside this file.
const Context = createContext<AccountContextProps>(null!);

export function useAccountContext() {
	return useContext(Context);
}

function createAccountEntries(accounts: Account[], entries: AccountEntries): AccountEntries {
	for (const account of accounts) {
		for (const entry of account.entries) {
			const key = formatDate(entry.date);

			if (!(key in entries)) {
				entries[key] = {};
			}

			entries[key][account.id] = entry.amount;
		}
	}

	return sortObject(entries);
}
