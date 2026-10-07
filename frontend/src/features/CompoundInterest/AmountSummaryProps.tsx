import clsx from "clsx";
import type { FC } from "react";
import styles from "./AmountSummaryProps.module.css";
import { formatter } from "./index";

interface AmountSummaryProps {
	amount: number;
	label: string;
	color?: string;
}

const AmountSummary: FC<AmountSummaryProps> = ({ amount, label, color }) => (
	<div className={styles.row}>
		<div className={clsx(styles.dot, color)}></div>
		<div>
			<span className={styles.label}>{label}</span>
			<div className={styles.amount}>{formatter.format(amount)}</div>
		</div>
	</div>
);

export default AmountSummary;
