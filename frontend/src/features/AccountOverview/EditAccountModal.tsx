import { useSettingsContext } from "features/Settings/context";
import { useForm } from "react-hook-form";
import { useUpdateAccountMutation } from "@/api/account";
import type { Account, AccountKind } from "@/api/generated/types.gen";
import { Button } from "@/ui/Button/Button";
import { ButtonContainer } from "@/ui/ButtonContainer/ButtonContainer";
import { Dialog } from "@/ui/Dialog/Dialog";
import { Input } from "@/ui/Input/Input";
import styles from "./AddAccountModal.module.css";

interface EditAccountModalProps {
	account: Account;
	open: boolean;
	onClose: () => void;
}

export default function EditAccountModal({
	account,
	open,
	onClose,
}: Readonly<EditAccountModalProps>) {
	return (
		<Dialog onClose={onClose} open={open} title="Edit account">
			<Form account={account} onSuccess={onClose} />
		</Dialog>
	);
}

interface FormValues {
	name: string;
	currency: string;
	kind: AccountKind;
}

function Form({ account, onSuccess }: { account: Account; onSuccess: () => void }) {
	const {
		values: { currencyRates },
	} = useSettingsContext();

	const { mutate } = useUpdateAccountMutation();
	const {
		register,
		handleSubmit,
		formState: { dirtyFields },
	} = useForm<FormValues>({
		defaultValues: { name: account.name, currency: account.currency, kind: account.kind },
	});

	const onSubmit = (values: FormValues) => {
		const changes: Partial<FormValues> = {};
		if (dirtyFields.name) changes.name = values.name;
		if (dirtyFields.currency) changes.currency = values.currency;
		if (dirtyFields.kind) changes.kind = values.kind;

		if (Object.keys(changes).length === 0) {
			onSuccess();
			return;
		}

		mutate({ id: account.id, ...changes }, { onSuccess });
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.field_group}>
				<fieldset className={styles.fieldset}>
					<Input label="Name" {...register("name", { required: true })} />
					<label className={styles.field}>
						<span className={styles.form_label}>Account type</span>
						<select className={styles.select} {...register("kind", { required: true })}>
							<option value={"Cash"}>Cash</option>
							<option value={"Investment"}>Investment</option>
							<option value={"Pension"}>Pension</option>
						</select>
					</label>
					<label className={styles.field}>
						<span className={styles.form_label}>Account currency</span>
						<select className={styles.select} {...register("currency", { required: true })}>
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
				<Button onClick={onSuccess} type="button" variant="Transparent">
					Cancel
				</Button>
				<Button type="submit">Save</Button>
			</ButtonContainer>
		</form>
	);
}
