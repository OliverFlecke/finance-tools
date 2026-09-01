import ClientOnly from "components/ClientOnly";
import Stocks from "features/Stocks";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Stocks" };

export default function StocksPage() {
	return (
		<ClientOnly>
			<Stocks />
		</ClientOnly>
	);
}
