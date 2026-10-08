import SelectCurrency from "components/SelectCurrency";
import SettingsContext from "features/Settings/context";
import { useCallback, useContext } from "react";
import { NumericFormat } from "react-number-format";
import { convertToCurrency, formatCurrency } from "../../utils/converters";
import { TaxCalculatorContext } from "./state";
import styles from "./TaxCalculatorInput.module.css";

export default function TaxCalculatorInput() {
	const { values } = useContext(SettingsContext);
	const { state, dispatch } = useContext(TaxCalculatorContext);

	const onCurrencyChanged = useCallback(
		(currency: string) => dispatch({ type: "SET CURRENCY", currency }),
		[dispatch],
	);

	return (
		<div className={styles.row}>
			<div className={styles.field}>
				<label className="input-label" htmlFor="salary">
					Income
				</label>
				<NumericFormat
					inputMode="numeric"
					placeholder="100,000"
					className={styles.salary_input}
					defaultValue={state.salary}
					thousandSeparator={true}
					onValueChange={(e) => dispatch({ type: "SET SALARY", salary: e.floatValue ?? 0 })}
				/>
			</div>
			<SelectCurrency
				label="Currency"
				onChange={onCurrencyChanged}
				defaultCurrency={values.preferredDisplayCurrency}
			/>
			<SalaryInPreferredCurrency salary={state.salary} currency={state.currency} />
		</div>
	);
}
interface SalaryInPreferredCurrencyProps {
	salary?: number;
	currency: string;
}

function SalaryInPreferredCurrency({ salary, currency }: SalaryInPreferredCurrencyProps) {
	const {
		values: { preferredDisplayCurrency, currencyRates },
	} = useContext(SettingsContext);
	if (!salary) return null;

	const value = convertToCurrency(salary, currencyRates.usd, currency, preferredDisplayCurrency);

	return (
		<div className={styles.preferred_currency}>
			<span className="input-label">Income in preferred currency</span>
			<span className={styles.preferred_currency_value}>
				{formatCurrency(value, preferredDisplayCurrency, {
					maximumFractionDigits: 0,
				})}
			</span>
		</div>
	);
}
