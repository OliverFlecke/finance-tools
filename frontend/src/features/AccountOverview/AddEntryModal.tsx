import { Button, ButtonContainer, Input, Modal } from "@oliverflecke/components-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAccountContext } from "./Context";

export default function AddEntryModal() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Button buttonType="Primary" onClick={() => setIsOpen(true)}>
				Add entry
			</Button>

			<Modal isOpen={isOpen} onDismiss={() => setIsOpen(false)}>
				<Form onSuccess={() => setIsOpen(false)} />
			</Modal>
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
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="p-4">
				<h2 className="text-lg text-gray-700 dark:text-gray-400">Add new entry on date</h2>
				<Input type="date" className="m-4" {...register("date")} />
			</div>

			<ButtonContainer>
				<Button buttonType="Primary" type="submit">
					Add
				</Button>
			</ButtonContainer>
		</form>
	);
}
