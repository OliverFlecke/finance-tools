import { DarkModeToggle, useDarkModeWithClass } from '@oliverflecke/components-react';
import React from 'react';
import { useGithubUser } from 'utils/githubAuth';
import LoginState from './login/LoginState';
import Navigation from './Navigation';

const Header: React.FC = () => {
	const { isDarkMode, setDarkMode } = useDarkModeWithClass();
	const { user, authorizeUrl, logout } = useGithubUser();

	return (
		<header className="p-4 flex flex-row justify-between text-gray-300 bg-emerald-900 ">
			<Navigation />

			<div className="flex flex-row justify-center items-start">
				<LoginState user={user} authorizeUrl={authorizeUrl} logout={logout} />
				<div className="py-2 pl-4">
					<DarkModeToggle darkMode={isDarkMode} onToggle={() => setDarkMode(!isDarkMode)} />
				</div>
			</div>
		</header>
	);
};

export default Header;
