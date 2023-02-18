import ClientOnly from 'components/ClientOnly';
import SettingsMenu from 'features/Settings/SettingsMenu';
import React from 'react';
import LoginState from './login/LoginState';
import Navigation from './Navigation';

const Header: React.FC = () => {
	return (
		<header className="flex flex-row justify-between bg-emerald-900 px-4 py-2 text-gray-300">
			<Navigation />
			<div>
				<div className="flex flex-row items-center justify-center space-x-4">
					<LoginState />
					<ClientOnly>
						<SettingsMenu />
					</ClientOnly>
				</div>
			</div>
		</header>
	);
};

export default Header;
