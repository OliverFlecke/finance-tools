import React, { FC, useCallback, useContext, useId } from 'react';
import SettingsContext from 'features/Settings/context';
import { CurrencySymbol } from 'features/Currency/api';

interface Props {
	label: string;
	defaultCurrency?: string;
	onChange: (currency: CurrencySymbol) => void;
}

const SelectCurrency: FC<Props> = ({ label, defaultCurrency, onChange }) => {
	const id = useId();
	const {
		values: { currencyRates },
	} = useContext(SettingsContext);

	const onSelection = useCallback(
		(x: React.ChangeEvent<HTMLSelectElement>) => {
			const currency = x.currentTarget.value;
			if (!currency) return;

			onChange(currency);
		},
		[onChange]
	);

	if (!currencyRates) return null;

	return (
		<>
			<label htmlFor={id}>{label}</label>
			<select
				id={id}
				onChange={onSelection}
				defaultValue={defaultCurrency}
				className="rounded dark:bg-gray-700"
			>
				{Object.keys(currencyRates.usd)
					.map(x => x.toUpperCase())
					.map(key => (
						<option key={key} value={key}>
							{key}
						</option>
					))}
			</select>
		</>
	);
};

export default SelectCurrency;
