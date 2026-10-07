import { useCallback, useEffect, useState } from "react";

export function useDarkModeWithClass() {
	const [isDarkMode, setState] = useState<boolean>(initialState());

	const setDarkMode = useCallback((isDark: boolean) => {
		if (typeof window !== "undefined") {
			localStorage.theme = isDark ? "dark" : "light";
		}
		setState(isDark);
	}, []);

	useEffect(() => {
		document.body.classList.toggle("dark", isDarkMode);
	}, [isDarkMode]);

	return { isDarkMode, setDarkMode };
}

function initialState(): boolean {
	if (typeof window === "undefined") return false;
	if ("theme" in localStorage) return localStorage.theme === "dark";
	return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
