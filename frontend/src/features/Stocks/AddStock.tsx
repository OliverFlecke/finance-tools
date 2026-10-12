import clsx from "clsx";
import { Plus } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useStockSymbolExists } from "@/api/stock";
import { Button } from "@/ui/Button/Button";
import { ButtonContainer } from "@/ui/ButtonContainer/ButtonContainer";
import { Dialog } from "@/ui/Dialog/Dialog";
import { Input } from "@/ui/Input/Input";
import styles from "./AddStock.module.css";

interface AddStockForm {
	symbol: string;
}

export default function AddStock() {
	const symbolExists = useStockSymbolExists();

	const [isOpen, setIsOpen] = useState(false);
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<AddStockForm>();

	const checkSymbol = useCallback(
		async ({ symbol }: AddStockForm) => {
			try {
				if (!(await symbolExists(symbol))) {
					setError("symbol", { message: `Stock with symbol '${symbol}' was not found` });
					return;
				}
			} catch (error) {
				toast.error("Failed to look up symbol", {
					description: error instanceof Error ? error.message : undefined,
				});
				return;
			}

			toast.success(`Symbol '${symbol.toUpperCase()}' found`);
			reset();
			setIsOpen(false);
		},
		[reset, setError, symbolExists],
	);

	return (
		<>
			<Button onClick={() => setIsOpen(true)}>
				<Plus />
				Add symbol
			</Button>

			<Dialog onClose={() => setIsOpen(false)} open={isOpen} title="Add symbol">
				<form className={styles.form} onSubmit={handleSubmit(checkSymbol)}>
					<fieldset className={styles.fieldset}>
						<Input
							label="Symbol"
							placeholder="AAPL, MSFT..."
							{...register("symbol", { required: true })}
							errorMessage={
								errors.symbol?.message ?? (errors.symbol && "Please provide a symbol to add")
							}
						/>
					</fieldset>

					<ButtonContainer>
						<Button
							className={clsx("btn btn-primary", styles.submit_button)}
							disabled={isSubmitting}
							type="submit"
						>
							Check
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
