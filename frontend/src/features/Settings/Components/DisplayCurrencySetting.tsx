import SelectCurrency from "components/SelectCurrency";
import { useCallback, useContext } from "react";
import SettingsContext from "../context";

export default function DisplayCurrencySetting() {
	const {
		values: { preferredDisplayCurrency },
		dispatch,
	} = useContext(SettingsContext);

	const onChange = useCallback(
		(currency: string) => dispatch({ type: "SET DISPLAY CURRENCY", currency }),
		[dispatch],
	);

	return (
		<SelectCurrency
			label="Preferred display currency"
			defaultCurrency={preferredDisplayCurrency}
			onChange={onChange}
		/>
	);
}
