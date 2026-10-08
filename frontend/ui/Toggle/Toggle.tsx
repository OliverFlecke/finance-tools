import type { InputHTMLAttributes } from "react";
import styles from "./Toggle.module.css";

export function Toggle(props: InputHTMLAttributes<HTMLInputElement>) {
	return (
		<label className={styles.switch}>
			<input type="checkbox" {...props} />
			<span className={styles.slider} />
		</label>
	);
}
