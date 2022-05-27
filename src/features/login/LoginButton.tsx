import React from 'react';

interface LoginButtonProps {
	authorizeUrl: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({ authorizeUrl }) => (
	<a className="btn btn-primary" href={authorizeUrl}>
		Login
	</a>
);

export default LoginButton;
