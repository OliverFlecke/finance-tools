import React from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';

interface Props {
	onClick: () => void;
}

export default function AddButton({ onClick }: Props) {
	return (
		<button onClick={onClick} className="flex focus:outline-none">
			<IoAddCircleOutline
				size={24}
				className="text-green-700 dark:text-green-500"
			/>
		</button>
	);
}
