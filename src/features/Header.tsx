import { DarkModeToggle, useDarkModeWithClass } from '@oliverflecke/components-react';
import React from 'react';
import { useGithubUser } from 'utils/githubAuth';
import LoginState from './login/LoginState';

const Header: React.FC = () => {
	const { isDarkMode, setDarkMode } = useDarkModeWithClass();
	const { user, authorizeUrl, logout } = useGithubUser();

	return (
		<header className="p-2 flex flex-row justify-between text-gray-300 bg-emerald-900 ">
			<h1 className="p-4 text-xl uppercase font-sans font-light">Finance tracker</h1>
			<div className="flex flex-row justify-center items-center">
				<LoginState user={user} authorizeUrl={authorizeUrl} logout={logout} />
				<div className="p-4">
					<DarkModeToggle darkMode={isDarkMode} onToggle={() => setDarkMode(!isDarkMode)} />
				</div>
			</div>
		</header>
	);
};

export default Header;
