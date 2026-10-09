import { useSettingsContext } from "features/Settings/context";
import { CreditCardPlus } from "lucide-react";
import { useId, useRef } from "react";
import { useForm } from "react-hook-form";
import { useAddAccountMutation } from "@/api/account";
import type { Account } from "@/api/generated/types.gen";
import { Button } from "@/ui/Button/Button";
import { ButtonContainer } from "@/ui/ButtonContainer/ButtonContainer";
import { Dialog } from "@/ui/Dialog/Dialog";
import { Input } from "@/ui/Input/Input";
import styles from "./AddAccountModal.module.css";

export default function AddAccount() {
	const ref = useRef<HTMLDialogElement>(null);
	return (
		<Dialog
			ref={ref}
			title="Add new account"
			trigger={
				<Button variant="Secondary">
					<CreditCardPlus />
					Add account
				</Button>
			}
		>
			<Form onSuccess={() => ref.current?.close()} />
		</Dialog>
	);
}

function Form({ onSuccess }: { onSuccess: () => void }) {
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
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.field_group}>
				<fieldset className={styles.fieldset}>
					<Input
						label="Name"
						placeholder="Savings, Investments..."
						{...register("name", { required: true })}
						errorMessage={errors.name && "Please provide a name for your account"}
					/>
					<label className={styles.field}>
						<span className={styles.form_label}>Account type</span>
						<select className={styles.select} {...register("kind", { required: true })}>
							<option value={"Cash"}>Cash</option>
							<option value={"Investment"}>Investment</option>
							<option value={"Pension"}>Pension</option>
						</select>
					</label>
					<label className={styles.field} htmlFor={currencyId}>
						<span className={styles.form_label}>Account currency</span>
						<select
							className={styles.select}
							defaultValue={preferredDisplayCurrency}
							id={currencyId}
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
				<Button onClick={close} variant="Transparent">
					Cancel
				</Button>
				<Button type="submit">Add</Button>
			</ButtonContainer>
		</form>
	);
}
