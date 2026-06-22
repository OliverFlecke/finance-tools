import { AccountApi, Configuration } from "@api/finance";
import type { CreateAccountRequest } from "@api/finance/esm";
import { useMutation, useQuery } from "@tanstack/react-query";
import { authClient } from "api/auth";

const configuration = new Configuration({
	basePath: "http://localhost:8787",
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
