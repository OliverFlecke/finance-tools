import clsx from "clsx";
import type React from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/ui/Input/Input";
import { type CreateBudgetDto, useCreateBudgetCallback } from "./api";
import styles from "./BudgetCreate.module.css";

const BudgetCreate: React.FC<{ onBudgetCreated: () => void }> = ({ onBudgetCreated }) => {
	const createBudget = useCreateBudgetCallback();
	const { register, handleSubmit } = useForm<CreateBudgetDto>();

	const onSubmit = useCallback(
		async (data: CreateBudgetDto) => {
			console.log(`Creating budget with name: ${data.title}`);
			await createBudget(data);
			onBudgetCreated();
		},
		[createBudget, onBudgetCreated],
	);

	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<div className={styles.field}>
					<label className={styles.label} htmlFor="title">
						Title
					</label>
					<Input {...register("title")} id="title" placeholder="My budget" />
				</div>
				<input type="submit" value="Create" className={clsx("btn btn-success", styles.submit)} />
			</form>
		</div>
	);
};

export default BudgetCreate;
