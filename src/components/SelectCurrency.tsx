import { CurrencySymbol } from 'features/Currency/api';
import SettingsContext from 'features/Settings/context';
import React, { FC, useCallback, useContext, useId, useState } from 'react';
import ClientOnly from './ClientOnly';

interface Props {
	label: string;
	defaultCurrency?: string;
	onChange: (currency: CurrencySymbol) => void;
}

const SelectCurrency: FC<Props> = ({ label, defaultCurrency, onChange }) => {
	const id = useId();
	const {
		values: { currencyRates, preferredDisplayCurrency },
	} = useContext(SettingsContext);
	const [currency, setCurrency] = useState(
		defaultCurrency ?? preferredDisplayCurrency,
	);

	const onSelection = useCallback(
		(x: React.ChangeEvent<HTMLSelectElement>) => {
			const currency = x.currentTarget.value;
			if (!currency) return;

			setCurrency(currency);
			onChange(currency);
		},
		[onChange],
	);

	if (!currencyRates) return null;

	return (
		<ClientOnly>
			<label htmlFor={id} className="space-y-2">
				<span className="input-label">{label}</span>
				<select
					id={id}
					onChange={onSelection}
					className="block rounded w-full bg-gray-100 px-4 py-2 text-black shadow dark:bg-gray-700 dark:text-white"
					value={currency}
				>
					{Object.keys(currencyRates.usd)
						.map(x => x.toUpperCase())
						.map(key => (
							<option key={key} value={key}>
								{key}
							</option>
						))}
				</select>
			</label>
		</ClientOnly>
	);
};

export default SelectCurrency;
