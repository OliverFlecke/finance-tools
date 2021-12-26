import React, { useState } from 'react';
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
		return <LoginButton authorizeUrl={authorizeUrl} />;
	}

	return (
		<div className="flex items-center space-x-4">
			<span className="hidden sm:inline">{user.login}</span>
			<div className="group" onMouseLeave={() => setIsOpen(false)}>
				<button onClick={() => setIsOpen((x) => !x)}>
					<UserAvatar user={user} />
				</button>
			</div>
			<Menu isOpen={isOpen} logout={logout} />
		</div>
	);
};

export default LoginState;

interface LoginButtonProps {
	authorizeUrl: string;
}

const LoginButton = ({ authorizeUrl }: LoginButtonProps) => (
	<a className="btn btn-primary" href={authorizeUrl}>
		Login
	</a>
);

interface UserAvatarProps {
	user: User;
}

const UserAvatar = ({ user }: UserAvatarProps) => (
	<img
		src={user.avatar_url}
		alt="Avatar of the logged in user"
		className="max-h-10 rounded-full"
		loading="lazy"
	/>
);

interface MenuProps {
	isOpen: boolean;
	logout?: () => void;
}

const Menu = ({ isOpen, logout }: MenuProps) => (
	<div
		className={`${
			isOpen ? '' : 'hidden'
		} group-hover:block absolute right-0 rounded py-4 shadow bg-gray-100 dark:bg-gray-700`}
	>
		<button
			onClick={logout}
			className="btn flex items-center space-x-2 hover:text-gray-900 dark:hover:text-gray-400 hover:underline"
		>
			<IoLogOutOutline className="inline" />
			<span className="align-middle">Logout</span>
		</button>
	</div>
);
