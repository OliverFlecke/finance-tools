import React, { useCallback } from 'react';
import { IoSaveOutline } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import { AddItemToBudgetRequest, Item } from './api';
import { Button, ButtonContainer } from '@oliverflecke/components-react';

const EditItem: React.FC<{
	item: Item;
	update: (id: string, item: AddItemToBudgetRequest) => void;
}> = ({ update, item }) => {
	const { register, handleSubmit } = useForm<AddItemToBudgetRequest>({
		defaultValues: item,
	});
	const handleUpdate = useCallback(
		(data: AddItemToBudgetRequest) => {
			update(item.id, data);
		},
		[item.id, update],
	);

	return (
		<form
			onSubmit={handleSubmit(handleUpdate)}
			className="flex w-96 max-w-screen-lg flex-col space-y-4 rounded bg-indigo-500 p-4 dark:bg-indigo-900"
		>
			<h4 className="text-xl">Edit item</h4>
			<label className="edit-item">
				<span>Category</span>
				<input
					placeholder="Category"
					className="budget edit-item"
					{...register('category', { required: true })}
				/>
			</label>
			<label className="edit-item">
				<span>Name</span>
				<input
					placeholder="Name"
					className="budget edit-item"
					{...register('name', { required: true })}
				/>
			</label>
			<label className="edit-item">
				<span>Amount</span>
				<input
					placeholder="Amount"
					className="budget edit-item"
					onKeyDown={event => {
						if (
							!/-|\d|\.|Enter|Shift|Tab|Backspace|Delete|Arrow/.test(event.key)
						) {
							event.preventDefault();
						}
					}}
					{...register('amount', { required: true, valueAsNumber: true })}
				/>
			</label>

			<ButtonContainer>
				<Button buttonType="Transparent">Cancel</Button>
				<Button
					type="submit"
					buttonType="Primary"
					className="btn btn-primary flex items-center justify-center space-x-2 align-middle"
				>
					<span>Save</span>
					<IoSaveOutline />
				</Button>
			</ButtonContainer>
		</form>
	);
};

export default EditItem;
