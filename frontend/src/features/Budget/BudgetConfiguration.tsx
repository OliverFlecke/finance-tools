import type React from "react";
import { useContext } from "react";
import styles from "./BudgetConfiguration.module.css";
import { BudgetContext } from "./state";

const Configuration: React.FC = () => {
	const {
		state: { hideItems },
		dispatch,
	} = useContext(BudgetContext);

	return (
		<div className={styles.container}>
			<label className={styles.label}>
				<span>Hide items</span>
				<input
					type="checkbox"
					checked={hideItems}
					onChange={(e) => dispatch({ type: "HIDE ITEMS", value: e.target.checked })}
				/>
			</label>
		</div>
	);
};

export default Configuration;
