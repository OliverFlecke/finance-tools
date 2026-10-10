import { useQueryClient } from "@tanstack/react-query";
import { userManager } from "api/auth";
import { useCallback } from "react";
import { lookupStockOptions } from "@/api/generated/@tanstack/react-query.gen";
import { client } from "@/api/generated/client.gen";

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

/** Returns a callback to check whether a stock symbol exists. */
export function useStockSymbolExists() {
	const qc = useQueryClient();

	return useCallback(
		async (symbol: string) => {
			const data = await qc.fetchQuery(lookupStockOptions({ query: { symbols: symbol } }));
			return data.results.some((result) =>
				result.matches.some((match) => match.symbol.toUpperCase() === symbol.toUpperCase()),
			);
		},
		[qc],
	);
}
