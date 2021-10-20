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

	useEffect(() => {
		getMyUser().then(setUser);
	}, []);

	return (
		<header className="p-4 flex flex-row justify-between text-gray-300 bg-emerald-900 ">
			<Navigation />
			<div className="flex flex-row justify-center items-center">
				<LoginState
					user={user}
					authorizeUrl={`${baseUri}/signin?returnUrl=${window.location.toString()}`}
				/>
				<div className="p-4">
					<DarkModeToggle darkMode={isDarkMode} onToggle={() => setDarkMode(!isDarkMode)} />
				</div>
			</div>
		</header>
	);
};

export default Header;
