import clsx from "clsx";
import type React from "react";
import styles from "./TextPage.module.css";

const TextPage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<div className={styles.wrapper}>
		<div className={clsx("text-page", styles.content)}>{children}</div>
	</div>
);

export default TextPage;
