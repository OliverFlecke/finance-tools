import { Button, Modal } from '@oliverflecke/components-react';
import { getCurrencies } from 'features/Currency/api';
import React, { FC, useCallback, useContext, useEffect, useId, useState } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
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
	const id = useId();
	const {
		values: { preferredDisplayCurrency, currencyRates },
		dispatch,
	} = useContext(SettingsContext);

	const onChange = useCallback(
		(x: React.ChangeEvent<HTMLSelectElement>) => {
			const currency = x.currentTarget.value;
			if (!currency) return;

			dispatch({ type: 'SET DISPLAY CURRENCY', currency });
		},
		[dispatch]
	);

	if (!currencyRates) return null;

	return (
		<>
			<label htmlFor={id}>Preferred display currency</label>
			<select
				id={id}
				onChange={onChange}
				defaultValue={preferredDisplayCurrency}
				className="rounded dark:bg-gray-700"
			>
				{Object.keys(currencyRates.usd)
					.map((x) => x.toUpperCase())
					.map((key) => (
						<option key={key} value={key}>
							{key}
						</option>
					))}
			</select>
		</>
	);
};
