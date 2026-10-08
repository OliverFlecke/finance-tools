import { useAuth } from "react-oidc-context";

export default function LoginButton() {
	const { signinRedirect } = useAuth();

	return (
		<button type="button" className="btn btn-primary" onClick={() => signinRedirect()}>
			Login
		</button>
	);
}
