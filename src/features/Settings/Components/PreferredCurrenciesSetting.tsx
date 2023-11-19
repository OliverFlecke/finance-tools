import React, { useCallback, useContext, useState } from 'react';
import SelectCurrency from '../../../components/SelectCurrency';
import SettingsContext from '../context';

export default function PreferredCurrenciesSetting() {
	const { values, dispatch } = useContext(SettingsContext);

	const [code, setCode] = useState<string>(values.preferredDisplayCurrency);
	const addCode = useCallback(
		() => dispatch({ type: 'ADD PREFERRED CURRENCY', code }),
		[code, dispatch],
	);

	return (
		<div>
			<div className="flex justify-between items-end">
				<SelectCurrency
					label="Add to preferred currencies"
					onChange={ref => setCode(ref.valueOf())}
				/>
				<button onClick={addCode} className="rounded btn btn-secondary">
					Add
				</button>
			</div>
			<label className="input-label">Preferred currencies:</label>
			<span className="currency-list">
				{values.preferredCurrencies.map(code => (
					<span key={code}>{code}</span>
				))}
			</span>
		</div>
	);
}
