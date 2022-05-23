import { DarkModeToggle, Toggle } from '@oliverflecke/components-react';
import React, { useContext } from 'react';
import SettingsContext from '../context';

const ThemeSetting = () => {
	const { values, dispatch } = useContext(SettingsContext);

	return (
		<>
			<span>Theme follow OS</span>
			<div className="flex flex-row justify-end">
				<Toggle
					checked={values.themeFollowsOS}
					onChange={e =>
						dispatch({ type: 'SET THEME TO FOLLOW OS', shouldFollowOS: e.target.checked })
					}
				/>
			</div>

			{!values.themeFollowsOS && (
				<>
					<span>Theme</span>
					<div className="flex flex-row justify-end">
						<DarkModeToggle
							onToggle={() =>
								dispatch({ type: 'SET THEME', preferresDarkMode: !values.preferresDarkMode })
							}
							darkMode={values.preferresDarkMode}
						/>
					</div>
				</>
			)}
		</>
	);
};

export default ThemeSetting;
