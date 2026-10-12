"use client";

import AddTransaction from "./AddTransaction";
import ImportStocks from "./ImportStocks";
import styles from "./index.module.css";
import PortfolioSummary from "./PortfolioSummary";

export default function Stocks() {
	return (
		<div className={styles.container}>
			<PortfolioSummary />

			<div className={styles.actions}>
				<ImportStocks />
				<AddTransaction />
			</div>
		</div>
	);
}
