import { Button, ButtonContainer, Input } from "@oliverflecke/components-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog } from "@/ui/Dialog/Dialog";
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
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="rounded bg-indigo-500 p-4 dark:bg-indigo-900"
		>
			<div className="pb-4">
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
