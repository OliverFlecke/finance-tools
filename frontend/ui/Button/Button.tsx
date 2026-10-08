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
	icon?: boolean;
}

export function Button({
	variant = "Primary",
	className,
	icon,
	children,
	...buttonProps
}: ButtonProps) {
	const c = color(variant);

	return (
		<button
			className={clsx(styles.btn, colorClass(variant), icon && styles.icon, className)}
			style={{
				color: icon ? c?.background : undefined,
				backgroundColor: icon ? "transparent" : undefined,
			}}
			{...buttonProps}
		>
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

function color(type: ButtonType) {
	switch (type) {
		case "Primary":
			return {
				color: "var(--color-gray-100)",
				background: "var(--color-primary)",
				hoverBackground: "var(--color-primary-hover)",
			};

		case "Secondary":
			return {
				color: "var(--color-secondary-text)",
				background: "var(--color-secondary)",
				hoverBackground: "var(--color-secondary-hover)",
			};

		case "Success":
			return {
				color: "var(--color-white)",
				background: "var(--color-success)",
				hoverBackground: "var(--color-success-hover)",
			};

		case "Warning":
			return {
				color: "var(--color-gray-900)",
				background: "var(--color-warning)",
				hoverBackground: "var(--color-warning-hover)",
			};

		case "Danger":
			return {
				color: "var(--color-white)",
				background: "var(--color-danger)",
				hoverBackground: "var(--color-danger-hover)",
			};
	}
}
