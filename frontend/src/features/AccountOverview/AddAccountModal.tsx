import { Button, ButtonContainer, Input, Modal } from "@oliverflecke/components-react";
import { useSettingsContext } from "features/Settings/context";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { IoAddCircleOutline } from "react-icons/io5";
import { useAddAccountMutation } from "@/api/account";
import type { Account } from "@/api/generated/dist";

export default function AddAccount() {
	const [showPrompt, setShowPrompt] = useState(false);

	return (
		<>
			<button
				type="button"
				onClick={() => setShowPrompt((x) => !x)}
				className="btn btn-primary space-x-2"
			>
				<IoAddCircleOutline className="inline" />
				<span className="align-middle">Add account</span>
			</button>

			<Modal isOpen={showPrompt} onDismiss={close}>
				<Form onSuccess={() => setShowPrompt(false)} />
			</Modal>
		</>
	);
}

function Form({ onSuccess }: Readonly<{ onSuccess: () => void }>) {
	const {
		values: { currencyRates, preferredDisplayCurrency },
	} = useSettingsContext();

	const { mutate } = useAddAccountMutation();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Account>();

	const onSubmit = (account: Account) =>
		mutate(account, {
			onSuccess: () => {
				reset();
				onSuccess();
			},
		});

	const currencyId = useId();

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="rounded bg-indigo-500 p-4 dark:bg-indigo-900"
		>
			<div className="pb-4">
				<h2 className="text-lg text-gray-700 dark:text-gray-200">Add new account</h2>

				<fieldset className="space-y-2">
					<Input
						placeholder="Savings, Investments..."
						label="Name"
						{...register("name", { required: true })}
						errorMessage={errors.name && "Please provide a name for your account"}
					/>
					<label className="flex flex-col space-y-2">
						<span className="modal-form-label">Account type</span>
						<select className="modal-select" {...register("kind", { required: true })}>
							<option value={"Cash"}>Cash</option>
							<option value={"Investment"}>Investment</option>
						</select>
					</label>
					<label htmlFor={currencyId} className="flex flex-col space-y-2">
						<span className="modal-form-label">Account currency</span>
						<select
							id={currencyId}
							defaultValue={preferredDisplayCurrency}
							className="modal-select"
							{...register("currency", { required: true })}
						>
							{Object.keys(currencyRates.usd)
								.map((x) => x.toUpperCase())
								.map((key) => (
									<option key={key} value={key}>
										{key}
									</option>
								))}
						</select>
					</label>
				</fieldset>
			</div>

			<ButtonContainer>
				<Button buttonType="Transparent" onClick={close}>
					Cancel
				</Button>
				<Button type="submit">Add</Button>
			</ButtonContainer>
		</form>
	);
}
