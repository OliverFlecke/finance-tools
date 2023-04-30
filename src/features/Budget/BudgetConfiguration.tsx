import React, { useContext } from 'react';
import { BudgetContext } from './state';

const Configuration: React.FC = () => {
	const {
		state: { hideItems },
		dispatch,
	} = useContext(BudgetContext);

	return (
		<div className="mx-4 mt-2 rounded bg-sky-300 p-4 dark:bg-sky-900">
			<label className="space-x-4">
				<span>Hide items</span>
				<input
					type="checkbox"
					checked={hideItems}
					onChange={e =>
						dispatch({ type: 'HIDE ITEMS', value: e.target.checked })
					}
				/>
			</label>
		</div>
	);
};

export default Configuration;
