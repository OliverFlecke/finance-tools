import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { Upload } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
	getStockEventsQueryKey,
	getStockSummaryQueryKey,
	importStockEventsMutation,
} from "@/api/generated/@tanstack/react-query.gen";
import { Button } from "@/ui/Button/Button";
import { ButtonContainer } from "@/ui/ButtonContainer/ButtonContainer";
import { Dialog } from "@/ui/Dialog/Dialog";
import { Input } from "@/ui/Input/Input";
import styles from "./AddStock.module.css";

interface ImportStocksForm {
	portfolio: string;
	file: FileList;
}

export default function ImportStocks() {
	const { mutateAsync } = useMutation(importStockEventsMutation());
	const qc = useQueryClient();

	const [isOpen, setIsOpen] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<ImportStocksForm>();

	const importFile = useCallback(
		async ({ portfolio, file }: ImportStocksForm) => {
			try {
				const csv = await file[0].text();
				const { imported } = await mutateAsync({ body: { portfolio, csv } });
				toast.success(`Imported ${imported} event${imported === 1 ? "" : "s"}`);
				qc.invalidateQueries({ queryKey: getStockEventsQueryKey() });
				qc.invalidateQueries({ queryKey: getStockSummaryQueryKey() });
				reset();
				setIsOpen(false);
			} catch (error) {
				toast.error("Failed to import events", {
					description: error instanceof Error ? error.message : undefined,
				});
			}
		},
		[mutateAsync, qc, reset],
	);

	return (
		<>
			<Button onClick={() => setIsOpen(true)}>
				<Upload />
				Import
			</Button>

			<Dialog onClose={() => setIsOpen(false)} open={isOpen} title="Import events">
				<form className={styles.form} onSubmit={handleSubmit(importFile)}>
					<fieldset className={styles.fieldset}>
						<Input
							label="Portfolio"
							placeholder="e.g. IBKR"
							{...register("portfolio", { required: true })}
							errorMessage={errors.portfolio && "Please provide a portfolio name"}
						/>
						<Input
							label="CSV file"
							type="file"
							accept=".csv,text/csv"
							{...register("file", { required: true })}
							errorMessage={errors.file && "Please select a CSV file to import"}
						/>
					</fieldset>

					<ButtonContainer>
						<Button
							className={clsx("btn btn-primary", styles.submit_button)}
							disabled={isSubmitting}
							type="submit"
						>
							Import
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
