import type { CurrencySymbol } from "features/Currency/api";
import SettingsContext from "features/Settings/context";
import type React from "react";
import { useCallback, useContext, useId, useState } from "react";
import ClientOnly from "./ClientOnly";
import styles from "./SelectCurrency.module.css";

interface Props {
	label: string;
	defaultCurrency?: string;
	onChange: (currency: CurrencySymbol) => void;
}

export default function SelectCurrency({ label, defaultCurrency, onChange }: Props) {
	const id = useId();
	const {
		values: { currencyRates, preferredDisplayCurrency, preferredCurrencies },
	} = useContext(SettingsContext);
	const [currency, setCurrency] = useState(defaultCurrency ?? preferredDisplayCurrency);

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
			<label htmlFor={id} className={styles.label}>
				<span className="input-label">{label}</span>
				<select id={id} onChange={onSelection} className={styles.select} value={currency}>
					<optgroup label="Preferred currencies">
						{preferredCurrencies.map((code) => (
							<option key={code} value={code}>
								{code}
							</option>
						))}
					</optgroup>
					<optgroup label="Others">
						{Object.keys(currencyRates.usd)
							.map((x) => x.toUpperCase())
							.filter((x) => preferredCurrencies.find((code) => code === x) === undefined)
							.map((key) => (
								<option key={key} value={key}>
									{key}
								</option>
							))}
					</optgroup>
				</select>
			</label>
		</ClientOnly>
	);
}
