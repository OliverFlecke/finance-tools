import React from 'react';
import { IoLogOutOutline } from 'react-icons/io5';

interface LoginMenuProps {
	isOpen: boolean;
	logout?: () => void;
}

const LoginMenu: React.FC<LoginMenuProps> = ({ isOpen, logout }) => (
	<div
		className={`${
			isOpen ? '' : 'hidden'
		} absolute top-full right-0 z-10 rounded bg-gray-100 py-4 shadow outline group-hover:block dark:bg-gray-700`}
	>
		<button
			onClick={logout}
			className="btn flex items-center space-x-2 hover:text-gray-900 hover:underline dark:hover:text-gray-400"
		>
			<IoLogOutOutline className="inline" />
			<span className="align-middle">Logout</span>
		</button>
	</div>
);

export default LoginMenu;
