import React from 'react';
import { IoLogOutOutline } from 'react-icons/io5';

interface LoginMenuProps {
	isOpen: boolean;
	logoutUrl: string;
}

const LoginMenu: React.FC<LoginMenuProps> = ({ isOpen, logoutUrl }) => (
	<div
		className={`${
			isOpen ? '' : 'hidden'
		} absolute top-full right-0 z-10 rounded bg-gray-100 py-4 shadow outline group-hover:block dark:bg-gray-700`}
	>
		<a
			href={logoutUrl}
			className="btn flex items-center space-x-2 hover:text-gray-900 hover:underline dark:hover:text-gray-400"
		>
			<IoLogOutOutline className="inline" />
			<span className="align-middle">Logout</span>
		</a>
	</div>
);

export default LoginMenu;
