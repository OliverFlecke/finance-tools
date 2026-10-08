import clsx from "clsx";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/ui/Button/Button";
import styles from "./AddLine.module.css";
import type { AddItemToBudgetRequest } from "./api";

interface Props {
	add: (item: AddItemToBudgetRequest) => void;
	category?: string;
}

export default function AddLine({ add, category }: Props) {
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
								className={clsx("budget", styles.add_item)}
								{...register("category", { required: true })}
							/>
						)}
						<input
							placeholder="Name"
							className={clsx("budget", styles.add_item)}
							{...register("name", { required: true })}
						/>
						<input
							placeholder="Amount"
							className={clsx("budget", styles.add_item)}
							onKeyDown={(event) => {
								if (!/\d|\.|Enter|Shift|Tab|Backspace|Delete|Arrow/.test(event.key)) {
									event.preventDefault();
								}
							}}
							{...register("amount", { required: true, valueAsNumber: true })}
						/>

						<Button type="submit">
							<Plus />
							Add
						</Button>
					</form>
				</td>
			</tr>
		</tbody>
	);
}
