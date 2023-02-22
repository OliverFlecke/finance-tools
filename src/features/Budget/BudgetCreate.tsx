import { Input } from '@oliverflecke/components-react';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { CreateBudgetDto, useCreateBudgetCallback } from './api';

const BudgetCreate = () => {
	const createBudget = useCreateBudgetCallback();
	const { register, handleSubmit } = useForm<CreateBudgetDto>();
	const onSubmit = useCallback(
		async (data: CreateBudgetDto) => {
			console.log(`Creating budget with name: ${data.title}`);
			await createBudget(data);
		},
		[createBudget]
	);

	return (
		<div className="flex flex-col space-y-4 rounded bg-purple-900 p-4">
			<h3 className="text-xl">Create new budget</h3>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-row justify-between"
			>
				<label className="flex flex-row items-baseline space-x-4">
					<span className="py-2">Title</span>
					<Input {...register('title')} placeholder="My budget" />
				</label>
				<input type="submit" value="Create" className="btn btn-success w-fit" />
			</form>
		</div>
	);
};

export default BudgetCreate;
