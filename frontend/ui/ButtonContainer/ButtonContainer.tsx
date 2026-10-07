import clsx from "clsx";
import type { ReactNode } from "react";
import styles from "./ButtonContainer.module.css";

export type ButtonContainerPosition = "Left" | "Right" | "Center";

export interface ButtonContainerProps {
	position?: ButtonContainerPosition;
	className?: string;
	children: ReactNode;
}

export function ButtonContainer({ position = "Right", className, children }: ButtonContainerProps) {
	return (
		<div className={clsx(styles.container, positionClass(position), className)}>{children}</div>
	);
}

function positionClass(position: ButtonContainerPosition): string {
	switch (position) {
		case "Left":
			return styles.left;
		case "Center":
			return styles.center;
		case "Right":
			return styles.right;
	}
}
