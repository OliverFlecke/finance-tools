import clsx from "clsx";
import {
	type ChangeEvent,
	forwardRef,
	type ReactNode,
	type SelectHTMLAttributes,
	useCallback,
} from "react";
import styles from "./Select.module.css";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	label: string;
	children: ReactNode;
	onSelection?: (value: string) => void;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
	({ label, children, onSelection, className, ...selectProps }, ref) => {
		const onChange = useCallback(
			(e: ChangeEvent<HTMLSelectElement>) => onSelection?.(e.currentTarget.value),
			[onSelection],
		);

		return (
			<label className={styles.label}>
				<span className="input-label">{label}</span>
				<select
					className={clsx(styles.select, className)}
					onChange={onChange}
					ref={ref}
					{...selectProps}
				>
					{children}
				</select>
			</label>
		);
	},
);
Select.displayName = "Select";

export function SelectOption({ value, children }: { value: string; children?: ReactNode }) {
	return <option value={value}>{children ?? value}</option>;
}
