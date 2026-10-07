import { getCurrencies } from "features/Currency/api";
import { type FC, useContext, useEffect, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { Button } from "@/ui/Button/Button";
import { Dialog } from "@/ui/Dialog/Dialog";
import DisplayCurrencySetting from "./Components/DisplayCurrencySetting";
import PreferredCurrenciesSetting from "./Components/PreferredCurrenciesSetting";
import ThemeSetting from "./Components/ThemeSetting";
import SettingsContext from "./context";
import styles from "./SettingsMenu.module.css";

const SettingsMenu: FC = () => {
	const { dispatch } = useContext(SettingsContext);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		getCurrencies()
			.then((rates) => dispatch({ type: "SET CURRENCY RATES", rates }))
			.catch(() => console.warn("Unable to load currency rates"));
	}, [dispatch]);

	return (
		<div className={styles.container}>
			<button
				type="button"
				className={styles.trigger}
				title="Settings"
				onClick={() => setIsOpen((x) => !x)}
			>
				<IoSettingsOutline size={24} />
			</button>
			<Dialog open={isOpen} onClose={() => setIsOpen(false)}>
				<div className={styles.panel}>
					<h2 className={styles.heading}>Settings</h2>
					<SettingsList />

					<Button buttonType="Secondary" onClick={() => setIsOpen(false)}>
						Close
					</Button>
				</div>
			</Dialog>
		</div>
	);
};

export default SettingsMenu;

const SettingsList: FC = () => (
	<div className="settings-list">
		<div className={styles.full_row}>
			<DisplayCurrencySetting />
		</div>
		<div className={styles.full_row}>
			<PreferredCurrenciesSetting />
		</div>
		<ThemeSetting />
	</div>
);
