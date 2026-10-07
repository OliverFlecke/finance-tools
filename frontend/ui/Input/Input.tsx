import clsx from "clsx";
import { forwardRef, type InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	errorMessage?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ label, errorMessage, className, type = "text", ...inputProps }, ref) => (
		<div className="space-y-2">
			<label className="space-y-2">
				<span className="input-label">{label}</span>
				<input
					ref={ref}
					type={type}
					{...inputProps}
					className={clsx(
						"rounded-md bg-white px-4 py-2 shadow focus:border-indigo-400 focus:outline-none focus:ring dark:bg-gray-900 dark:text-gray-100",
						className,
					)}
				/>
			</label>
			{errorMessage !== undefined && (
				<div className="text-sm text-red-700 dark:text-red-600">{errorMessage}</div>
			)}
		</div>
	),
);
Input.displayName = "Input";
