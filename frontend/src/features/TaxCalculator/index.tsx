"use client";

import SettingsContext from "features/Settings/context";
import type React from "react";
import { useContext, useReducer } from "react";
import Guide from "./Guide";
import styles from "./index.module.css";
import { getDefaultState, TaxCalculatorContext } from "./state";
import taxCalculatorReducer from "./state/reducer";
import TaxCalculatorInput from "./TaxCalculatorInput";
import TaxTable from "./TaxTable";

const TaxCalculator: React.FC = () => {
	const { values } = useContext(SettingsContext);
	const [state, dispatch] = useReducer(taxCalculatorReducer, {
		...getDefaultState(),
		currency: values.preferredDisplayCurrency,
	});

	return (
		<div className={styles.container}>
			<TaxCalculatorContext.Provider value={{ state, dispatch }}>
				<TaxCalculatorInput />
				<TaxTable />
			</TaxCalculatorContext.Provider>

			<Guide />
		</div>
	);
};

export default TaxCalculator;
