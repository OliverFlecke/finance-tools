import ClientOnly from "components/ClientOnly";
import SettingsMenu from "features/Settings/SettingsMenu";
import type React from "react";
import styles from "./Header.module.css";
import LoginState from "./login/LoginState";
import Navigation from "./Navigation";

const Header: React.FC = () => {
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
};

export default Header;
