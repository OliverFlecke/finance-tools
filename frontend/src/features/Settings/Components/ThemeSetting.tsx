import { useContext } from "react";
import { DarkModeToggle } from "@/ui/DarkModeToggle/DarkModeToggle";
import { Toggle } from "@/ui/Toggle/Toggle";
import SettingsContext from "../context";
import styles from "./ThemeSetting.module.css";

const ThemeSetting = () => {
	const { values, dispatch } = useContext(SettingsContext);

	return (
		<>
			<span>Theme follow OS</span>
			<div className={styles.toggle_row}>
				<Toggle
					checked={values.themeFollowsOS}
					onChange={(e) =>
						dispatch({
							type: "SET THEME TO FOLLOW OS",
							shouldFollowOS: e.target.checked,
						})
					}
				/>
			</div>

			{!values.themeFollowsOS && (
				<>
					<span>Theme</span>
					<div className={styles.toggle_row}>
						<DarkModeToggle
							onToggle={() =>
								dispatch({
									type: "SET THEME",
									preferresDarkMode: !values.preferresDarkMode,
								})
							}
							darkMode={values.preferresDarkMode}
						/>
					</div>
				</>
			)}
		</>
	);
};

export default ThemeSetting;
