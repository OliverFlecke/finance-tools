import React from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import { Line } from './index';

const AddLine: React.FC<{ add: (line: Line) => void }> = ({ add }) => {
	const { register, handleSubmit } = useForm<Line>();

	return (
		<tbody>
			<tr>
				<td colSpan={3}>
					<form
						onSubmit={handleSubmit(add)}
						className="flex flex-wrap justify-end space-x-2 pb-4 pt-2"
					>
						<input
							placeholder="Category"
							className="budget"
							{...register('category', { required: true })}
						/>
						<input
							placeholder="Name"
							className="budget"
							{...register('name', { required: true })}
						/>
						<input
							placeholder="Amount"
							className="budget"
							onKeyPress={event => {
								if (!/\d|\./.test(event.key)) {
									event.preventDefault();
									return;
								}
							}}
							{...register('amount', { required: true, valueAsNumber: true })}
						/>

						<button
							type="submit"
							className="btn btn-primary flex items-center space-x-2 align-middle"
						>
							<span>Add</span>
							<IoAddCircleOutline />
						</button>
					</form>
				</td>
			</tr>
		</tbody>
	);
};

export default AddLine;
