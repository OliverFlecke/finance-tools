import type React from "react";
import styles from "./StockErrorDisplay.module.css";
import type { StockError } from "./state";

const StockErrorDisplay: React.FC<{ error: StockError | null }> = ({ error }) => {
	if (error) {
		return <div className={styles.error}>{error.message}</div>;
	}

	return null;
};

export default StockErrorDisplay;
