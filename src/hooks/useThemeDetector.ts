import { useEffect, useState } from 'react'

export default function useThemeDetector() {
	const [isDarkTheme, setIsDarkTheme] = useState(getCurrentThemeQuery()?.matches ?? false)

	useEffect(() => {
		const listener = (e: MediaQueryListEvent) => setIsDarkTheme(e.matches)
		const darkThemeMediaQuery = getCurrentThemeQuery()
		darkThemeMediaQuery?.addEventListener('change', listener)

		return () => darkThemeMediaQuery?.removeEventListener('change', listener)
	}, [])

	return isDarkTheme
}

function getCurrentThemeQuery(): MediaQueryList | null {
	if (typeof window === 'undefined') return null

	return window.matchMedia('(prefers-color-scheme: dark)')
}
