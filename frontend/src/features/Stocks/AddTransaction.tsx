import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
	addStockEventMutation,
	getStockEventsQueryKey,
	getStockSummaryQueryKey,
} from "@/api/generated/@tanstack/react-query.gen";
import type { StockEventKind } from "@/api/generated/types.gen";
import { Button } from "@/ui/Button/Button";
import { ButtonContainer } from "@/ui/ButtonContainer/ButtonContainer";
import { Dialog } from "@/ui/Dialog/Dialog";
import { Input } from "@/ui/Input/Input";
import { Select, SelectOption } from "@/ui/Select/Select";
import styles from "./AddStock.module.css";

interface AddTransactionForm {
	portfolio: string;
	symbol: string;
	kind: StockEventKind;
	quantity: number;
	price: number;
	commission: number;
}

export default function AddTransaction() {
	const { mutateAsync } = useMutation(addStockEventMutation());
	const qc = useQueryClient();

	const [isOpen, setIsOpen] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<AddTransactionForm>({ defaultValues: { kind: "Buy", commission: 0 } });

	const addTransaction = useCallback(
		async (body: AddTransactionForm) => {
			try {
				await mutateAsync({ body });
				toast.success(`Added ${body.kind.toLowerCase()} transaction for ${body.symbol}`);
				qc.invalidateQueries({ queryKey: getStockEventsQueryKey() });
				qc.invalidateQueries({ queryKey: getStockSummaryQueryKey() });
				reset();
				setIsOpen(false);
			} catch (error) {
				toast.error("Failed to add transaction", {
					description: error instanceof Error ? error.message : undefined,
				});
			}
		},
		[mutateAsync, qc, reset],
	);

	return (
		<>
			<Button onClick={() => setIsOpen(true)}>
				<Plus />
				Add transaction
			</Button>

			<Dialog onClose={() => setIsOpen(false)} open={isOpen} title="Add transaction">
				<form className={styles.form} onSubmit={handleSubmit(addTransaction)}>
					<fieldset className={styles.fieldset}>
						<Input
							label="Portfolio"
							placeholder="e.g. IBKR"
							{...register("portfolio", { required: true })}
							errorMessage={errors.portfolio && "Please provide a portfolio name"}
						/>
						<Input
							label="Symbol"
							placeholder="AAPL, MSFT..."
							{...register("symbol", { required: true })}
							errorMessage={errors.symbol && "Please provide a symbol"}
						/>
						<Select label="Type" {...register("kind", { required: true })}>
							<SelectOption value="Buy">Buy</SelectOption>
							<SelectOption value="Sell">Sell</SelectOption>
						</Select>
						<Input
							label="Shares"
							min={0}
							step="any"
							type="number"
							{...register("quantity", { required: true, valueAsNumber: true, min: 0 })}
							errorMessage={errors.quantity && "Please provide a share count"}
						/>
						<Input
							label="Price"
							min={0}
							step="any"
							type="number"
							{...register("price", { required: true, valueAsNumber: true, min: 0 })}
							errorMessage={errors.price && "Please provide a price"}
						/>
						<Input
							label="Commission"
							min={0}
							step="any"
							type="number"
							{...register("commission", { valueAsNumber: true, min: 0 })}
							errorMessage={errors.commission && "Commission cannot be negative"}
						/>
					</fieldset>

					<ButtonContainer>
						<Button
							className={clsx("btn btn-primary", styles.submit_button)}
							disabled={isSubmitting}
							type="submit"
						>
							Add transaction
						</Button>
						<Button onClick={() => setIsOpen(false)} variant="Transparent">
							Cancel
						</Button>
					</ButtonContainer>
				</form>
			</Dialog>
		</>
	);
}
