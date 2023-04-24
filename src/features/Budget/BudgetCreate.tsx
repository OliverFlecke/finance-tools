import { Input } from '@oliverflecke/components-react';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { CreateBudgetDto, useCreateBudgetCallback } from './api';

const BudgetCreate: React.FC<{ onBudgetCreated: () => void }> = ({
	onBudgetCreated,
}) => {
	const createBudget = useCreateBudgetCallback();
	const { register, handleSubmit } = useForm<CreateBudgetDto>();

	const onSubmit = useCallback(
		async (data: CreateBudgetDto) => {
			console.log(`Creating budget with name: ${data.title}`);
			await createBudget(data);
			onBudgetCreated();
		},
		[createBudget, onBudgetCreated]
	);

	return (
		<div className="flex max-w-lg flex-col space-y-2 rounded bg-sky-300 p-4 dark:bg-sky-900">
			<h3 className="text-lg">New budget</h3>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col space-y-4"
			>
				<label className="flex flex-col items-baseline">
					<span className="text-md text-gray-700 dark:text-gray-100">
						Title
					</span>
					<Input {...register('title')} placeholder="My budget" />
				</label>
				<input
					type="submit"
					value="Create"
					className="btn btn-success w-full"
				/>
			</form>
		</div>
	);
};

export default BudgetCreate;
