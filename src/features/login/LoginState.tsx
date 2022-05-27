import { useOnOutsideMouseDown } from '@oliverflecke/components-react';
import React, { useCallback, useRef, useState } from 'react';
import { IoLogOutOutline } from 'react-icons/io5';
import { User } from 'utils/githubAuth';

interface LoginStateProps {
	user: User | null;
	authorizeUrl: string;
	logout?: () => void;
}

const LoginState: React.FC<LoginStateProps> = ({ user, authorizeUrl, logout }) =>
	user === null ? (
		<LoginButton authorizeUrl={authorizeUrl} />
	) : (
		<LoginMenu user={user} logout={logout} />
	);

export default LoginState;

interface LoginMenuProps {
	user: User;
	logout?: () => void;
}

const LoginMenu: React.FC<LoginMenuProps> = ({ user, logout }) => {
	const [isOpen, setIsOpen] = useState(false);

	const ref = useRef<HTMLDivElement>(null);
	useOnOutsideMouseDown(
		ref,
		useCallback(() => setIsOpen(false), [])
	);

	return (
		<div ref={ref} className="relative flex items-center space-x-4">
			<span className="hidden sm:inline">{user.login}</span>
			<div className="group">
				<button onClick={() => setIsOpen(x => !x)}>
					<UserAvatar user={user} />
				</button>
			</div>
			<Menu isOpen={isOpen} logout={logout} />
		</div>
	);
};

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
