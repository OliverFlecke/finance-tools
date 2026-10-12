import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { lookupStockOptions } from "@/api/generated/@tanstack/react-query.gen";

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
