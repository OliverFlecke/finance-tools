import type React from "react";
import { useAuth } from "react-oidc-context";

const LoginButton: React.FC = () => {
	const { signinRedirect } = useAuth();

	return (
		<button type="button" className="btn btn-primary" onClick={() => signinRedirect()}>
			Login
		</button>
	);
};

export default LoginButton;
