"use client";

import AddTransaction from "./AddTransaction";
import ImportStocks from "./ImportStocks";
import PortfolioSummary from "./PortfolioSummary";

export default function Stocks() {
	return (
		<>
			<PortfolioSummary />
			<ImportStocks />
			<AddTransaction />
		</>
	);
}
