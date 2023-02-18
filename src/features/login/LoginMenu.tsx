import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { IoLogOutOutline } from 'react-icons/io5';

interface LoginMenuProps {
	isOpen: boolean;
}

const LoginMenu: React.FC<LoginMenuProps> = ({ isOpen }) => (
	<div
		className={`${
			isOpen ? '' : 'hidden'
		} absolute top-full right-0 z-10 rounded bg-gray-100 py-4 shadow outline group-hover:block dark:bg-gray-700`}
	>
		<LogoutButton />
	</div>
);

export default LoginMenu;

const LogoutButton = () => {
	const { logout } = useAuth0();

	return (
		<button
			className="btn flex items-center space-x-2 hover:text-gray-900 hover:underline dark:hover:text-gray-400"
			onClick={() => {
				logout({
					logoutParams: {
						returnTo: window.location.origin,
					},
				});
			}}
		>
			<IoLogOutOutline className="inline" />
			<span className="align-middle">Logout</span>
		</button>
	);
};
