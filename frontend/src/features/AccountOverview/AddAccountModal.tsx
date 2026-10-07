import clsx from "clsx";
import { useSettingsContext } from "features/Settings/context";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { IoAddCircleOutline } from "react-icons/io5";
import { useAddAccountMutation } from "@/api/account";
import type { Account } from "@/api/generated/types.gen";
import { Button } from "@/ui/Button/Button";
import { ButtonContainer } from "@/ui/ButtonContainer/ButtonContainer";
import { Dialog } from "@/ui/Dialog/Dialog";
import { Input } from "@/ui/Input/Input";
import styles from "./AddAccountModal.module.css";

export default function AddAccount() {
	const [showPrompt, setShowPrompt] = useState(false);

	return (
		<>
			<button
				type="button"
				onClick={() => setShowPrompt((x) => !x)}
				className={clsx("btn btn-primary", styles.btn_spacing)}
			>
				<IoAddCircleOutline className={styles.icon} />
				<span className={styles.align_middle}>Add account</span>
			</button>

			<Dialog open={showPrompt} onClose={() => setShowPrompt(false)}>
				<Form onSuccess={() => setShowPrompt(false)} />
			</Dialog>
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
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<div className={styles.field_group}>
				<h2 className={styles.heading}>Add new account</h2>

				<fieldset className={styles.fieldset}>
					<Input
						placeholder="Savings, Investments..."
						label="Name"
						{...register("name", { required: true })}
						errorMessage={errors.name && "Please provide a name for your account"}
					/>
					<label className={styles.field}>
						<span className="modal-form-label">Account type</span>
						<select className="modal-select" {...register("kind", { required: true })}>
							<option value={"Cash"}>Cash</option>
							<option value={"Investment"}>Investment</option>
						</select>
					</label>
					<label htmlFor={currencyId} className={styles.field}>
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
