import clsx from "clsx";
import type React from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { useAuth } from "react-oidc-context";
import styles from "./LoginMenu.module.css";

interface LoginMenuProps {
	isOpen: boolean;
}

const LoginMenu: React.FC<LoginMenuProps> = ({ isOpen }) => (
	<div className={clsx(styles.menu, !isOpen && styles.hidden)}>
		<LogoutButton />
	</div>
);

export default LoginMenu;

const LogoutButton = () => {
	const { signoutRedirect } = useAuth();

	return (
		<button
			type="button"
			className={clsx("btn", styles.logout)}
			onClick={() => {
				signoutRedirect({
					post_logout_redirect_uri: window.location.origin,
				});
			}}
		>
			<IoLogOutOutline className={styles.icon} />
			<span className={styles.label}>Logout</span>
		</button>
	);
};
