import React from 'react';
import { StockError } from './state';

const StockErrorDisplay: React.FC<{ error: StockError | null }> = ({
	error,
}) => {
	if (error) {
		return (
			<div className="m-4 rounded bg-red-500 px-4 py-2 text-center text-lg dark:bg-red-900">
				{error.message}
			</div>
		);
	}

	return null;
};

export default StockErrorDisplay;
