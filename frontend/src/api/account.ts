import {
	AccountApi,
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
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["account"] });

			// TODO: set local state instead of invalidating the query
			// qc.setQueryData<AccountResponse | undefined>(["account"], (data) =>
			// 	!data
			// 		? undefined
			// 		: {
			// 				...data,
			// 			},
			// );
		},
	});
}
