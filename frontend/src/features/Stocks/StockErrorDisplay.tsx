import styles from "./StockErrorDisplay.module.css";
import type { StockError } from "./state";

export default function StockErrorDisplay({ error }: { error: StockError | null }) {
	if (error) {
		return <div className={styles.error}>{error.message}</div>;
	}

	return null;
}
