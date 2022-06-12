import { useOnOutsideMouseDown } from '@oliverflecke/components-react';
import React, { useCallback, useRef, useState } from 'react';
import { User } from 'utils/githubAuth';
import LoginButton from './LoginButton';
import LoginMenu from './LoginMenuProps';
import UserAvatar from './UserAvatarProps';

interface LoginStateProps {
	user: User | null;
	authorizeUrl: string;
	logoutUrl: string;
}

const LoginState: React.FC<LoginStateProps> = ({ user, authorizeUrl, logoutUrl }) =>
	user === null ? (
		<LoginButton authorizeUrl={authorizeUrl} />
	) : (
		<LoginDropDownMenu user={user} logoutUrl={logoutUrl} />
	);

export default LoginState;

interface LoginDropDownMenuProps {
	user: User;
	logoutUrl: string;
}

const LoginDropDownMenu: React.FC<LoginDropDownMenuProps> = ({ user, logoutUrl }) => {
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
			<LoginMenu isOpen={isOpen} logoutUrl={logoutUrl} />
		</div>
	);
};
