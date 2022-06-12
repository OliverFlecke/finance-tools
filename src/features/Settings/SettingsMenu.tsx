import { Button, Modal } from '@oliverflecke/components-react';
import { getCurrencies } from 'features/Currency/api';
import React, { FC, useContext, useEffect, useState } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import DisplayCurrencySetting from './Components/DisplayCurrencySetting';
import ThemeSetting from './Components/ThemeSetting';
import SettingsContext from './context';

const SettingsMenu: FC = () => {
	const { dispatch } = useContext(SettingsContext);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		getCurrencies()
			.then(rates => dispatch({ type: 'SET CURRENCY RATES', rates }))
			.catch(() => console.warn('Unable to load currency rates'));
	}, [dispatch]);

	return (
		<div className="z-50">
			<button
				className="flex h-full justify-center"
				title="Settings"
				onClick={() => setIsOpen(x => !x)}
			>
				<IoSettingsOutline size={24} />
			</button>
			<Modal isOpen={isOpen} onDismiss={() => setIsOpen(false)}>
				<div className="space-y-4 rounded bg-indigo-500 p-4 dark:bg-indigo-900">
					<h2 className="bold col-span-2 text-xl">Settings</h2>
					<SettingsList />

					<Button buttonType="Secondary" onClick={() => setIsOpen(false)}>
						Close
					</Button>
				</div>
			</Modal>
		</div>
	);
};

export default SettingsMenu;

const SettingsList: FC = () => (
	<div className="grid grid-cols-2 gap-y-4 gap-x-12">
		<div className="col-span-2">
			<DisplayCurrencySetting />
		</div>
		<ThemeSetting />
	</div>
);
