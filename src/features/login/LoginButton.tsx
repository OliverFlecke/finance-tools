import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

const LoginButton: React.FC = () => {
	const { loginWithRedirect } = useAuth0();

	return (
		<button className="btn btn-primary" onClick={() => loginWithRedirect()}>
			Login
		</button>
	);
};

export default LoginButton;
