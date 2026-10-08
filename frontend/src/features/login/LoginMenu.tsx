import clsx from "clsx";
import { LogOut } from "lucide-react";
import { useAuth } from "react-oidc-context";
import { Button } from "@/ui/Button/Button";
import styles from "./LoginMenu.module.css";

interface Props {
	isOpen: boolean;
}

export default function LoginMenu({ isOpen }: Props) {
	return (
		<div className={clsx(styles.menu, !isOpen && styles.hidden)}>
			<LogoutButton />
		</div>
	);
}

function LogoutButton() {
	const { signoutRedirect } = useAuth();

	return (
		<Button
			onClick={() => {
				signoutRedirect({
					post_logout_redirect_uri: window.location.origin,
				});
			}}
		>
			<LogOut />
			Logout
		</Button>
	);
}
