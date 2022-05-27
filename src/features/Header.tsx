import ClientOnly from 'components/ClientOnly';
import SettingsMenu from 'features/Settings/SettingsMenu';
import React, { useEffect, useState } from 'react';
import { User } from 'utils/githubAuth';
import { baseUri } from './apiBase';
import LoginState from './login/LoginState';
import Navigation from './Navigation';
import { getMyUser } from './user/userApi';

const returnUrl =
	process.env.NODE_ENV === 'development'
		? 'https://localhost:3000'
		: 'https://finance.oliverflecke.me';

const Header: React.FC = () => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		getMyUser().then(user => {
			if (user) setUser(user);
		});
	}, []);

	return (
		<header className="flex flex-row justify-between bg-emerald-900 px-4 py-2 text-gray-300">
			<Navigation />
			<div>
				<div className="flex flex-row items-center justify-center space-x-4">
					<LoginState
						user={user}
						logoutUrl={`${baseUri}/signout?returnUrl=${returnUrl}`}
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
