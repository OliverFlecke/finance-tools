import React from 'react';
import { useState } from 'react';
import { IoLogOutOutline } from 'react-icons/io5';
import { User } from 'utils/githubAuth';

interface LoginStateProps {
	user: User | null;
	authorizeUrl: string;
	logout?: () => void;
}

const LoginState: React.FC<LoginStateProps> = ({ user, authorizeUrl, logout }: LoginStateProps) => {
	const [isOpen, setIsOpen] = useState(false);

	if (user === null) {
		return (
			<a className="btn btn-primary" href={authorizeUrl}>
				Login
			</a>
		);
	}

	return (
		<div className="flex items-center space-x-4">
			<span className="hidden sm:inline">{user.login}</span>
			<div className="group" onMouseLeave={() => setIsOpen(false)}>
				<button onClick={() => setIsOpen((x) => !x)}>
					<img
						src={user.avatar_url}
						alt="Avatar of the logged in user"
						className="max-h-10 rounded-full"
						loading="lazy"
					/>
				</button>
				<div
					className={`${
						isOpen ? '' : 'hidden'
					} group-hover:block absolute right-0 rounded py-4 shadow bg-coolGray-100 dark:bg-coolGray-700`}
				>
					<button
						onClick={logout}
						className="btn flex items-center space-x-2 hover:text-coolGray-900 dark:hover:text-coolGray-400 hover:underline"
					>
						<IoLogOutOutline className="inline" />
						<span className="align-middle">Logout</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default LoginState;
