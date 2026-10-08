import ClientOnly from "components/ClientOnly";
import SettingsMenu from "features/Settings/SettingsMenu";
import styles from "./Header.module.css";
import LoginState from "./login/LoginState";
import Navigation from "./Navigation";

export default function Header() {
	return (
		<header className={styles.header}>
			<Navigation />
			<div>
				<div className={styles.actions}>
					<LoginState />
					<ClientOnly>
						<SettingsMenu />
					</ClientOnly>
				</div>
			</div>
		</header>
	);
}
