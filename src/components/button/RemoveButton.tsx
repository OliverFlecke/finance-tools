import React from 'react';
import { IoRemoveCircleOutline } from 'react-icons/io5';

interface Props {
	onClick: () => void;
}

export default function RemoveButton({ onClick }: Props) {
	return (
		<button onClick={onClick} className="flex focus:outline-none">
			<IoRemoveCircleOutline
				size={24}
				className="text-red-700 dark:text-red-500"
			/>
		</button>
	);
}
