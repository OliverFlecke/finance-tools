import clsx from "clsx";
import { forwardRef, type InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	errorMessage?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ label, errorMessage, className, type = "text", ...inputProps }, ref) => (
		<div className={styles.wrapper}>
			<label className={styles.label}>
				<span className="input-label">{label}</span>
				<input ref={ref} type={type} {...inputProps} className={clsx(styles.input, className)} />
			</label>
			{errorMessage !== undefined && <div className={styles.error}>{errorMessage}</div>}
		</div>
	),
);
Input.displayName = "Input";
