import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/ui/Button/Button";
import { ButtonContainer } from "@/ui/ButtonContainer/ButtonContainer";
import { Dialog } from "@/ui/Dialog/Dialog";
import { Input } from "@/ui/Input/Input";
import styles from "./AddEntryModal.module.css";
import { useAccountContext } from "./Context";

export default function AddEntryModal() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Button buttonType="Primary" onClick={() => setIsOpen(true)}>
				Add entry
			</Button>

			<Dialog open={isOpen} onClose={() => setIsOpen(false)}>
				<Form onSuccess={() => setIsOpen(false)} />
			</Dialog>
		</>
	);
}

function Form({ onSuccess }: Readonly<{ onSuccess: () => void }>) {
	const { addEntry } = useAccountContext();
	const { register, handleSubmit } = useForm<{ date: string }>();
	const onSubmit = ({ date }: { date: string }) => {
		addEntry(date);
		onSuccess();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<div className={styles.field_group}>
				<h2 className={styles.heading}>Add new entry on date</h2>
				<Input type="date" className={styles.date_input} {...register("date")} />
			</div>

			<ButtonContainer>
				<Button buttonType="Primary" type="submit">
					Add
				</Button>
			</ButtonContainer>
		</form>
	);
}
