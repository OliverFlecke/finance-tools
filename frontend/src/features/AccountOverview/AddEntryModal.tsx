import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/ui/Button/Button";
import { Dialog } from "@/ui/Dialog/Dialog";
import { Input } from "@/ui/Input/Input";
import { Label } from "@/ui/Label/Label";
import styles from "./AddEntryModal.module.css";
import { useAccountContext } from "./Context";

export default function AddEntryModal() {
	return (
		<Dialog
			title="Add new date entry"
			trigger={
				<Button variant="Primary">
					<Plus />
					Add entry
				</Button>
			}
		>
			<Form />
		</Dialog>
	);
}

function Form() {
	const { addEntry } = useAccountContext();
	const { register, handleSubmit } = useForm<{ date: string }>();
	const onSubmit = ({ date }: { date: string }) => {
		addEntry(date);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<fieldset>
				<Label>
					Date
					<Input type="date" className={styles.date_input} {...register("date")} />
				</Label>
			</fieldset>

			<Button variant="Primary" type="submit">
				Add
			</Button>
		</form>
	);
}
