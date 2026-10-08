import { Plus } from "lucide-react";
import { useCallback, useContext, useState } from "react";
import SelectCurrency from "@/components/SelectCurrency";
import { Button } from "@/ui/Button/Button";
import SettingsContext from "../context";
import styles from "./PreferredCurrenciesSetting.module.css";

export default function PreferredCurrenciesSetting() {
	const { values, dispatch } = useContext(SettingsContext);

	const [code, setCode] = useState<string>(values.preferredDisplayCurrency);
	const addCode = useCallback(
		() => dispatch({ type: "ADD PREFERRED CURRENCY", code }),
		[code, dispatch],
	);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<SelectCurrency
					label="Add to preferred currencies"
					onChange={(ref) => setCode(ref.valueOf())}
				/>
				<Button onClick={addCode} variant="Link">
					<Plus />
				</Button>
			</div>

			<span>Preferred currencies:</span>
			<ol>
				{values.preferredCurrencies.map((code) => (
					<li key={code}>{code}</li>
				))}
			</ol>
		</div>
	);
}
