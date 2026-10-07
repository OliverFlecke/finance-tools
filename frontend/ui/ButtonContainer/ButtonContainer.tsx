import clsx from "clsx";
import type { ReactNode } from "react";

export type ButtonContainerPosition = "Left" | "Right" | "Center";

export interface ButtonContainerProps {
	position?: ButtonContainerPosition;
	className?: string;
	children: ReactNode;
}

export function ButtonContainer({ position = "Right", className, children }: ButtonContainerProps) {
	return (
		<div
			className={clsx(
				"flex w-full flex-row space-x-4 rounded-md bg-gray-50 p-4 dark:bg-gray-900",
				positionClass(position),
				className,
			)}
		>
			{children}
		</div>
	);
}

function positionClass(position: ButtonContainerPosition): string {
	switch (position) {
		case "Left":
			return "justify-start";
		case "Center":
			return "justify-center";
		case "Right":
			return "justify-end";
	}
}
