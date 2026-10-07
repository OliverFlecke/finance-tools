import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

export interface DarkModeToggleProps {
	darkMode: boolean;
	onToggle?: () => void;
}

export function DarkModeToggle({ darkMode, onToggle }: DarkModeToggleProps) {
	return (
		<button
			type="button"
			onClick={onToggle}
			className="h-6 w-6 focus:outline-none"
			aria-label="theme toggle"
		>
			{darkMode ? <IoMoonOutline size={24} /> : <IoSunnyOutline size={24} />}
		</button>
	);
}
