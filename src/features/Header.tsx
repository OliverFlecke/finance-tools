import ClientOnly from 'components/ClientOnly';
import SettingsMenu from 'features/Settings/SettingsMenu';
import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { User } from 'utils/githubAuth';
import { baseUri } from './apiBase';
import LoginState from './login/LoginState';
import Navigation from './Navigation';
import { getMyUser } from './user/userApi';

const Header: React.FC = () => {
	const [user, setUser] = useState<User | null>(null);

	const returnUrl =
		process.env.NODE_ENV === 'development'
			? 'http://localhost:3000'
			: 'https://finance.oliverflecke.me';

	useEffect(() => {
		getMyUser().then(user => {
			if (user) setUser(user);
		});
	}, []);

	const logout = useCallback(
		() =>
			alert(
				'Logout functionality has not yet been implemented. If you really need to, clear your cookies'
			),
		[]
	);

	return (
		<header className="flex flex-row justify-between bg-emerald-900 px-4 py-2 text-gray-300">
			<Navigation />
			<div>
				<div className="flex flex-row items-center justify-center space-x-4">
					<LoginState
						user={user}
						logout={logout}
						authorizeUrl={`${baseUri}/signin?returnUrl=${returnUrl}`}
					/>
					<ClientOnly>
						<SettingsMenu />
					</ClientOnly>
				</div>
			</div>
		</header>
	);
};

export default Header;
