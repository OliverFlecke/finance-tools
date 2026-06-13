import { AccountApi, Configuration } from "@api/finance";
import { useQuery } from "@tanstack/react-query";
import { authClient } from "api/auth";

const configuration = new Configuration({
	basePath: "http://localhost:8787",
	accessToken: () => authClient.getTokenSilently(),
});

const api = new AccountApi(configuration);

export function useAccounts() {
	return useQuery({
		queryKey: ["accounts"],
		queryFn: () => api.accounts(),
	});
}
