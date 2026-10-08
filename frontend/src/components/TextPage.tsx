import type React from "react";
import styles from "./TextPage.module.css";

const TextPage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<div className={styles.wrapper}>
		<div className={styles.content}>{children}</div>
	</div>
);

export default TextPage;
