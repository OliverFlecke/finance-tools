import type React from "react";
import styles from "./TextPage.module.css";

export default function TextPage({ children }: { children: React.ReactNode }) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>{children}</div>
		</div>
	);
}
