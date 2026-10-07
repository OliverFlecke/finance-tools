import clsx from "clsx";
import {
	type ChangeEvent,
	forwardRef,
	type ReactNode,
	type SelectHTMLAttributes,
	useCallback,
} from "react";

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
			<label className="flex flex-col space-y-2">
				<span className="input-label">{label}</span>
				<select
					ref={ref}
					onChange={onChange}
					className={clsx(
						"rounded-md bg-gray-100 px-4 py-2 shadow focus:border-indigo-400 focus:outline-none focus:ring dark:bg-gray-900 dark:text-white",
						className,
					)}
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
