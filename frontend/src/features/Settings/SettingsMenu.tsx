import { getCurrencies } from "features/Currency/api";
import { Settings } from "lucide-react";
import { useContext, useEffect } from "react";
import { Dialog } from "@/ui/Dialog/Dialog";
import DisplayCurrencySetting from "./Components/DisplayCurrencySetting";
import PreferredCurrenciesSetting from "./Components/PreferredCurrenciesSetting";
import SettingsContext from "./context";
import styles from "./SettingsMenu.module.css";

export default function SettingsMenu() {
	const { dispatch } = useContext(SettingsContext);

	useEffect(() => {
		getCurrencies()
			.then((rates) => dispatch({ type: "SET CURRENCY RATES", rates }))
			.catch(() => console.warn("Unable to load currency rates"));
	}, [dispatch]);

	return (
		<Dialog
			title="Settings"
			trigger={
				<button type="button" title="Settings">
					<Settings />
				</button>
			}
		>
			<SettingsList />
		</Dialog>
	);
}

function SettingsList() {
	return (
		<div className={styles.container}>
			<DisplayCurrencySetting />
			<PreferredCurrenciesSetting />
		</div>
	);
}
