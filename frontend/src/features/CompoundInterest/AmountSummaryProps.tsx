import clsx from "clsx";
import styles from "./AmountSummaryProps.module.css";
import { formatter } from "./index";

interface AmountSummaryProps {
	amount: number;
	label: string;
	color?: string;
}

export default function AmountSummary({ amount, label, color }: AmountSummaryProps) {
	return (
		<div className={styles.row}>
			<div className={clsx(styles.dot, color)}></div>
			<div>
				<span className={styles.label}>{label}</span>
				<div className={styles.amount}>{formatter.format(amount)}</div>
			</div>
		</div>
	);
}
