import type { InputHTMLAttributes } from "react";

export function Toggle(props: InputHTMLAttributes<HTMLInputElement>) {
	return (
		<label className="switch">
			<input type="checkbox" {...props} />
			<span className="slider" />
		</label>
	);
}
