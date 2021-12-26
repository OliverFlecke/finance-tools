import { DarkModeToggle, useDarkModeWithClass } from '@oliverflecke/components-react';
import React, { useEffect, useState } from 'react';
import { User } from 'utils/githubAuth';
import { baseUri } from './apiBase';
import LoginState from './login/LoginState';
import Navigation from './Navigation';
import { getMyUser } from './user/userApi';

const Header: React.FC = () => {
	const { isDarkMode, setDarkMode } = useDarkModeWithClass();
	const [user, setUser] = useState<User | null>(null);

	const returnUrl =
		process.env.NODE_ENV === 'development'
			? 'http://localhost:3000'
			: 'https://finance.oliverflecke.me';

	useEffect(() => {
		getMyUser().then((user) => {
			if (user) setUser(user);
		});
	}, []);

	return (
		<header className="px-4 py-2 flex flex-row justify-between text-gray-300 bg-emerald-900">
			<Navigation />
			<div>
				<div className="flex flex-row justify-center items-center space-x-4">
					<LoginState user={user} authorizeUrl={`${baseUri}/signin?returnUrl=${returnUrl}`} />
					<DarkModeToggle darkMode={isDarkMode} onToggle={() => setDarkMode(!isDarkMode)} />
				</div>
			</div>
		</header>
	);
};

export default Header;
