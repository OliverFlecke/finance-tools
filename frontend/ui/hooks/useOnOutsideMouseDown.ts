import { type RefObject, useEffect } from "react";

export function useOnOutsideMouseDown<T extends HTMLElement>(
	ref: RefObject<T | null>,
	action: () => void,
) {
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				action();
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [action, ref]);
}
