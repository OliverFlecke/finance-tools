import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authClient } from "api/auth";
import { getAccountsOptions, getAccountsQueryKey } from "@/api/generated/@tanstack/react-query.gen";
import { client } from "@/api/generated/client.gen";
import { addEntry, createAccount } from "@/api/generated/sdk.gen";
import type {
	AccountResponse,
	AddAccountEntryRequest,
	CreateAccountRequest,
} from "@/api/generated/types.gen";

client.setConfig({
	baseUrl: process.env.NEXT_PUBLIC_API_HOST,
	auth: () => authClient.getTokenSilently(),
});

export function useAccounts() {
	return useQuery(getAccountsOptions());
}

export function useAddAccountMutation() {
	return useMutation({
		mutationFn: (account: CreateAccountRequest) =>
			createAccount({ body: account, throwOnError: true }).then(({ data }) => data),
	});
}

export function useAddEntryMutation() {
	interface Args extends AddAccountEntryRequest {
		id: string;
	}

	const qc = useQueryClient();

	return useMutation({
		mutationFn: ({ id, ...body }: Args) =>
			addEntry({ path: { id }, body, throwOnError: true }).then(({ data }) => data),

		// Update the local state as soon as the request is submitted, so
		// the UI can be updated immediately.
		onMutate: ({ id, ...entry }) => {
			qc.setQueryData<AccountResponse>(getAccountsQueryKey(), (data) =>
				!data
					? undefined
					: {
							accounts: data.accounts.map((a) =>
								a.id !== id ? a : { ...a, entries: [...a.entries, entry] },
							),
						},
			);
		},
	});
}
