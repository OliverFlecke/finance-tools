import {
	AccountApi,
	type AccountResponse,
	type AddAccountEntryRequest,
	Configuration,
	type CreateAccountRequest,
} from "@api/finance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authClient } from "api/auth";

const configuration = new Configuration({
	basePath: process.env.NEXT_PUBLIC_API_HOST,
	accessToken: () => authClient.getTokenSilently(),
});

const api = new AccountApi(configuration);

export function useAccounts() {
	return useQuery({
		queryKey: ["accounts"],
		queryFn: () => api.getAccounts(),
	});
}

export function useAddAccountMutation() {
	return useMutation({
		mutationFn: (account: CreateAccountRequest) =>
			api.createAccount({ createAccountRequest: account }),
	});
}

export function useAddEntryMutation() {
	interface Args extends AddAccountEntryRequest {
		id: string;
	}

	const qc = useQueryClient();

	return useMutation({
		mutationFn: ({ id, ...addAccountEntryRequest }: Args) =>
			api.addEntry({ id, addAccountEntryRequest }),

		// Update the local state as soon as the request is submitted, so
		// the UI can be updated immediately.
		onMutate: ({ id, ...entry }) => {
			qc.setQueryData<AccountResponse>(["accounts"], (data) =>
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
