import { Button, Modal } from '@oliverflecke/components-react';
import { getCurrencies } from 'features/Currency/api';
import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import SelectCurrency from '../../components/SelectCurrency';
import SettingsContext from './context';

const SettingsMenu: FC = () => {
	const { dispatch } = useContext(SettingsContext);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		getCurrencies()
			.then((rates) => dispatch({ type: 'SET CURRENCY RATES', rates }))
			.catch(() => console.warn('Unable to load currency rates'));
	}, [dispatch]);

	return (
		<div className="z-50">
			<button className="flex h-full justify-center" onClick={() => setIsOpen((x) => !x)}>
				<IoSettingsOutline size={24} />
			</button>
			<Modal isOpen={isOpen} onDismiss={() => setIsOpen(false)}>
				<div className="space-y-4 rounded bg-indigo-500 p-4 dark:bg-indigo-900">
					<h2 className="bold col-span-2 text-xl">Settings</h2>
					<div className="grid grid-cols-2 gap-x-12">
						<DisplayCurrencySetting />
					</div>

					<Button buttonType="Secondary" onClick={() => setIsOpen(false)}>
						Close
					</Button>
				</div>
			</Modal>
		</div>
	);
};

export default SettingsMenu;

const DisplayCurrencySetting: FC = () => {
	const {
		values: { preferredDisplayCurrency },
		dispatch,
	} = useContext(SettingsContext);

	const onChange = useCallback(
		(currency: string) => dispatch({ type: 'SET DISPLAY CURRENCY', currency }),
		[dispatch]
	);

	return (
		<SelectCurrency
			label="Preferred display currency"
			defaultCurrency={preferredDisplayCurrency}
			onChange={onChange}
		/>
	);
};
