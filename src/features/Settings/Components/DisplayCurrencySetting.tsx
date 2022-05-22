import React from 'react';
import SelectCurrency from 'components/SelectCurrency';
import { FC, useCallback, useContext } from 'react';
import SettingsContext from '../context';

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

export default DisplayCurrencySetting;
