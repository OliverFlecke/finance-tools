import React from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import { AddItemToBudgetRequest } from './api';

interface Props {
	add: (item: AddItemToBudgetRequest) => void;
	category?: string;
}

const AddLine: React.FC<Props> = ({ add, category }) => {
	const { register, handleSubmit } = useForm<AddItemToBudgetRequest>({
		defaultValues: {
			category,
		},
	});

	return (
		<tbody>
			<tr>
				<td colSpan={4}>
					<form
						onSubmit={handleSubmit(add)}
						className="flex flex-wrap justify-end space-x-2 pb-4 pt-2"
					>
						{!category && (
							<input
								placeholder="Category"
								className="budget add-item"
								{...register('category', { required: true })}
							/>
						)}
						<input
							placeholder="Name"
							className="budget add-item"
							{...register('name', { required: true })}
						/>
						<input
							placeholder="Amount"
							className="budget add-item"
							onKeyDown={event => {
								if (
									!/\d|\.|Enter|Shift|Tab|Backspace|Delete|Arrow/.test(
										event.key,
									)
								) {
									event.preventDefault();
								}
							}}
							{...register('amount', { required: true, valueAsNumber: true })}
						/>

						<button
							type="submit"
							className="btn btn-primary flex items-center space-x-2 align-middle"
						>
							<span>Add</span>
							<IoAddCircleOutline
								size={24}
								className="text-green-400 dark:text-green-500"
							/>
						</button>
					</form>
				</td>
			</tr>
		</tbody>
	);
};

export default AddLine;
