import { useState, useEffect } from 'react';

const useThemeDetector = () => {
	const [isDarkTheme, setIsDarkTheme] = useState(getCurrentThemeQuery().matches);
	const listener = (e: MediaQueryListEvent) => setIsDarkTheme(e.matches);

	useEffect(() => {
		const darkThemeMediaQuery = getCurrentThemeQuery();
		darkThemeMediaQuery.addEventListener('change', listener);

		return () => darkThemeMediaQuery.removeEventListener('change', listener);
	}, []);

	return isDarkTheme;
};

export default useThemeDetector;

function getCurrentThemeQuery() {
	return window.matchMedia('(prefers-color-scheme: dark)');
}
