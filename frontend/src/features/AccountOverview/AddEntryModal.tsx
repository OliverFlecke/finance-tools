import { Plus } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/ui/Button/Button";
import { Dialog } from "@/ui/Dialog/Dialog";
import { Input } from "@/ui/Input/Input";
import { Label } from "@/ui/Label/Label";
import styles from "./AddEntryModal.module.css";
import { useAccountContext } from "./Context";

export default function AddEntryModal() {
	const ref = useRef<HTMLDialogElement>(null);

	return (
		<Dialog
			ref={ref}
			title="Add new date entry"
			trigger={
				<Button variant="Primary">
					<Plus />
					Add entry
				</Button>
			}
		>
			<Form onSuccess={() => ref.current?.close()} />
		</Dialog>
	);
}

function Form({ onSuccess }: { onSuccess: () => void }) {
	const { addEntry } = useAccountContext();
	const { register, handleSubmit } = useForm<{ date: string }>();
	const onSubmit = ({ date }: { date: string }) => {
		addEntry(date);
		onSuccess();
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<fieldset>
				<Label>
					Date
					<Input type="date" {...register("date")} />
				</Label>
			</fieldset>

			<Button type="submit" variant="Primary">
				Add
			</Button>
		</form>
	);
}
