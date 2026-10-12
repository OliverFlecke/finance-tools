import ImportStocks from "./ImportStocks";
import PortfolioSummary from "./PortfolioSummary";
import styles from "./index.module.css";

export default function Stocks() {
	return (
		<div className={styles.container}>
			<PortfolioSummary />
			<ImportStocks />
		</div>
	);
}
