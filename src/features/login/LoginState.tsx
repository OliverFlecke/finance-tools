import { useAuth0, User } from '@auth0/auth0-react';
import { useOnOutsideMouseDown } from '@oliverflecke/components-react';
import React, { useCallback, useRef, useState } from 'react';
import LoginButton from './LoginButton';
import LoginMenu from './LoginMenu';
import UserAvatar from './UserAvatar';

const LoginState: React.FC = () => {
	const { user } = useAuth0();

	return user ? <LoginDropDownMenu user={user} /> : <LoginButton />;
};

export default LoginState;

interface LoginDropDownMenuProps {
	user: User;
}

const LoginDropDownMenu: React.FC<LoginDropDownMenuProps> = ({ user }) => {
	const [isOpen, setIsOpen] = useState(false);

	const ref = useRef<HTMLDivElement>(null);
	useOnOutsideMouseDown(
		ref,
		useCallback(() => setIsOpen(false), []),
	);

	return (
		<div ref={ref} className="relative flex items-center space-x-4">
			<div className="group">
				<button onClick={() => setIsOpen(x => !x)}>
					<UserAvatar pictureUrl={user.picture} />
				</button>
			</div>
			<LoginMenu isOpen={isOpen} />
		</div>
	);
};
