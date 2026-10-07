import clsx from "clsx";
import type React from "react";
import { useForm } from "react-hook-form";
import { IoAddCircleOutline } from "react-icons/io5";
import styles from "./AddLine.module.css";
import type { AddItemToBudgetRequest } from "./api";

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
					<form onSubmit={handleSubmit(add)} className={styles.form}>
						{!category && (
							<input
								placeholder="Category"
								className="budget add-item"
								{...register("category", { required: true })}
							/>
						)}
						<input
							placeholder="Name"
							className="budget add-item"
							{...register("name", { required: true })}
						/>
						<input
							placeholder="Amount"
							className="budget add-item"
							onKeyDown={(event) => {
								if (!/\d|\.|Enter|Shift|Tab|Backspace|Delete|Arrow/.test(event.key)) {
									event.preventDefault();
								}
							}}
							{...register("amount", { required: true, valueAsNumber: true })}
						/>

						<button type="submit" className={clsx("btn btn-primary", styles.submit)}>
							<span>Add</span>
							<IoAddCircleOutline size={24} className={styles.add_icon} />
						</button>
					</form>
				</td>
			</tr>
		</tbody>
	);
};

export default AddLine;
