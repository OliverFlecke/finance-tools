import { Modal } from '@oliverflecke/components-react';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import { StockContext } from './state';

const StockSettings: React.FC = () => {
	const {
		state: { preferredCurrency },
		dispatch,
	} = useContext(StockContext);
	const [isOpen, setIsOpen] = useState(false);
	const onClick = useCallback(() => setIsOpen(true), [setIsOpen]);
	const onChange = useCallback(
		(x: React.ChangeEvent<HTMLSelectElement>) => {
			const currency = x.currentTarget.value;
			if (!currency) return;

			dispatch({ type: 'SET PREFERRED CURRENCY', currency });
		},
		[dispatch]
	);

	return (
		<>
			<button className="btn btn-secondary" onClick={onClick}>
				<IoSettingsOutline />
			</button>

			<Modal isOpen={isOpen} onDismiss={() => setIsOpen(false)}>
				<div className="p-4 dark:bg-coolGray-900">
					<h2 className="font-bold text-lg">Stock settings</h2>

					<div className="grid grid-cols-2 gap-8">
						<label>Preferred currency</label>
						<select
							onChange={onChange}
							defaultValue={preferredCurrency}
							className="rounded dark:bg-coolGray-700"
						>
							<option value="USD">USD</option>
							<option value="EUR">EUR</option>
							<option value="DKK">DKK</option>
						</select>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default StockSettings;
