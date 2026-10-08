import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

export type ButtonType =
	| "Primary"
	| "Secondary"
	| "Success"
	| "Danger"
	| "Warning"
	| "Link"
	| "Transparent";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonType;
}

export function Button({
	variant: buttonType = "Primary",
	className,
	children,
	...buttonProps
}: ButtonProps) {
	return (
		<button className={clsx(styles.btn, colorClass(buttonType), className)} {...buttonProps}>
			{children}
		</button>
	);
}

function colorClass(type: ButtonType): string {
	switch (type) {
		case "Link":
			return styles.link;
		case "Warning":
			return styles.warning;
		case "Danger":
			return styles.danger;
		case "Transparent":
			return styles.transparent;
		case "Success":
			return styles.success;
		case "Secondary":
			return styles.secondary;
		case "Primary":
			return styles.primary;
	}
}
