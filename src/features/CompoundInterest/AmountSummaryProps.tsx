import React, { FC } from 'react';
import { formatter } from './index';

interface AmountSummaryProps {
	amount: number;
	label: string;
	color?: string;
}

const AmountSummary: FC<AmountSummaryProps> = ({ amount, label, color }) => (
	<div className="flex space-x-4">
		<div className={`h-6 w-6 rounded-full ${color}`}></div>
		<div>
			<span className="text-black dark:text-gray-300">{label}</span>
			<div className="text-2xl text-black dark:text-white">
				{formatter.format(amount)}
			</div>
		</div>
	</div>
);

export default AmountSummary;
