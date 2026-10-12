import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
	addStockEventMutation,
	getStockEventsQueryKey,
	getStockSummaryQueryKey,
} from "@/api/generated/@tanstack/react-query.gen";
import type { StockEventKind } from "@/api/generated/types.gen";
import { Button } from "@/ui/Button/Button";
import { Dialog } from "@/ui/Dialog/Dialog";
import { Input } from "@/ui/Input/Input";
import { Select, SelectOption } from "@/ui/Select/Select";
import styles from "./AddStock.module.css";

export default function AddTransaction() {
	const ref = useRef<HTMLDialogElement>(null);

	return (
		<Dialog
			ref={ref}
			title="Add transaction"
			trigger={
				<Button>
					<Plus />
					Add transaction
				</Button>
			}
		>
			<Form close={() => ref.current?.close()} />
		</Dialog>
	);
}

interface AddTransactionForm {
	portfolio: string;
	symbol: string;
	kind: StockEventKind;
	quantity: number;
	price: number;
	commission: number;
}

function Form({ close }: { close: () => void }) {
	const { mutateAsync } = useMutation(addStockEventMutation());
	const qc = useQueryClient();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<AddTransactionForm>({ defaultValues: { kind: "Buy", commission: 0 } });

	const addTransaction = async (body: AddTransactionForm) => {
		try {
			await mutateAsync({ body });
			toast.success(`Added ${body.kind.toLowerCase()} transaction for ${body.symbol}`);
			qc.invalidateQueries({ queryKey: getStockEventsQueryKey() });
			qc.invalidateQueries({ queryKey: getStockSummaryQueryKey() });
			reset();
			close();
		} catch (error) {
			toast.error("Failed to add transaction", {
				description: error instanceof Error ? error.message : undefined,
			});
		}
	};

	return (
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

			<Button disabled={isSubmitting} full>
				<Plus />
				Add transaction
			</Button>
		</form>
	);
}
