import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userManager } from "api/auth";
import { getAccountsQueryKey } from "@/api/generated/@tanstack/react-query.gen";
import { client } from "@/api/generated/client.gen";
import { addEntry, createAccount, updateAccount } from "@/api/generated/sdk.gen";
import type {
	Account,
	AccountResponse,
	AddAccountEntryRequest,
	CreateAccountRequest,
} from "@/api/generated/types.gen";

client.setConfig({
	baseUrl: process.env.NEXT_PUBLIC_API_HOST,
	auth: async () => {
		const user = await userManager.getUser();
		if (user && !user.expired) {
			return user.access_token;
		}
		const renewedUser = await userManager.signinSilent();
		return renewedUser?.access_token;
	},
});

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

// There's no bulk reorder endpoint, so persist each account's new sort key individually.
export function useUpdateAccountOrderMutation() {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: async (accounts: Account[]) => {
			// Sequential, not Promise.all: D1 chokes on a burst of concurrent writes.
			for (const [sorting, account] of accounts.entries()) {
				await updateAccount({
					path: { id: account.id },
					body: { sort_key: sorting },
					throwOnError: true,
				});
			}
		},
		onSuccess: (_, accounts) => {
			qc.setQueryData<AccountResponse>(getAccountsQueryKey(), (data) =>
				!data ? undefined : { accounts: accounts.map((a, sorting) => ({ ...a, sorting })) },
			);
		},
	});
}
