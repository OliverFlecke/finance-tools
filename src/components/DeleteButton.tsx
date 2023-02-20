import React from 'react';
import { IoTrashOutline } from 'react-icons/io5';

interface Props {
	onClick: () => void;
}

export default function DeleteButton({ onClick }: Props) {
	return (
		<button onClick={onClick} className="flex focus:outline-none">
			<IoTrashOutline size={24} className="text-red-700 dark:text-red-500" />
		</button>
	);
}
