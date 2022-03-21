import React from 'react';

export const Percentage: React.FC<{ value: number; tooltip: string }> = ({
	value,
	tooltip,
}) => {
	return (
		<span className="group relative w-10 text-right text-purple-400">
			{value.toLocaleString(undefined, { style: 'percent' })}
			<span className="tooltip group-hover:visible group-hover:opacity-100">
				{tooltip}
			</span>
		</span>
	);
};
