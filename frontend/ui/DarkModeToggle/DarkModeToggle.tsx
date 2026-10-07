import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import styles from "./DarkModeToggle.module.css";

export interface DarkModeToggleProps {
	darkMode: boolean;
	onToggle?: () => void;
}

export function DarkModeToggle({ darkMode, onToggle }: DarkModeToggleProps) {
	return (
		<button type="button" onClick={onToggle} className={styles.toggle} aria-label="theme toggle">
			{darkMode ? <IoMoonOutline size={24} /> : <IoSunnyOutline size={24} />}
		</button>
	);
}
