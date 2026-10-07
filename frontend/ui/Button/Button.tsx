import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

export type ButtonType =
	| "Primary"
	| "Secondary"
	| "Success"
	| "Danger"
	| "Warning"
	| "Link"
	| "Transparent";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	buttonType?: ButtonType;
}

export function Button({
	buttonType = "Primary",
	className,
	children,
	...buttonProps
}: ButtonProps) {
	return (
		<button className={clsx("btn", colorClass(buttonType), className)} {...buttonProps}>
			{children}
		</button>
	);
}

function colorClass(type: ButtonType): string {
	switch (type) {
		case "Link":
			return "btn-link";
		case "Warning":
			return "btn-warning";
		case "Danger":
			return "btn-danger";
		case "Transparent":
			return "btn-transparent";
		case "Success":
			return "btn-success";
		case "Secondary":
			return "btn-secondary";
		case "Primary":
			return "btn-primary";
	}
}
