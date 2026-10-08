import clsx from "clsx";
import { useCallback, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { IoAddCircleOutline } from "react-icons/io5";
import { Button } from "@/ui/Button/Button";
import { ButtonContainer } from "@/ui/ButtonContainer/ButtonContainer";
import { Dialog } from "@/ui/Dialog/Dialog";
import { Input } from "@/ui/Input/Input";
import styles from "./AddStock.module.css";
import { useTrackStockCallback } from "./API/stockApi";
import { useSharesCallback } from "./API/yahoo";
import type { Stock } from "./models";
import { StockContext } from "./state";

export default function AddStock() {
	const { dispatch } = useContext(StockContext);
	const fetchShares = useSharesCallback();
	const trackStock = useTrackStockCallback();

	const [isOpen, setIsOpen] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<Stock>();

	const addSymbol = useCallback(
		async (stock: Stock) => {
			const quotes = await fetchShares(stock.symbol);

			if (quotes === null || quotes.length === 0) {
				// TODO: Better error dialog to inform user that stock quote was not found
				alert(`Stock with symbol '${stock.symbol}' was not found`);
			} else {
				await trackStock(stock.symbol);
				dispatch({
					type: "ADD STOCK",
					stock: {
						...quotes[0],
						symbol: stock.symbol,
						lots: [],
					},
				});
				reset();
			}
		},
		[dispatch, fetchShares, reset, trackStock],
	);

	return (
		<>
			<button
				type="button"
				className={clsx("btn btn-primary", styles.trigger)}
				onClick={() => setIsOpen(true)}
			>
				<IoAddCircleOutline className={styles.icon} />
				<span className={styles.label}>Add symbol</span>
			</button>

			<Dialog title="Add symbol" open={isOpen} onClose={() => setIsOpen(false)}>
				<form onSubmit={handleSubmit(addSymbol)} className={styles.form}>
					<fieldset className={styles.fieldset}>
						<Input
							placeholder="AAPL, MSFT..."
							label="Symbol"
							{...register("symbol", { required: true })}
							errorMessage={errors.symbol && "Please provide a symbol to add"}
						/>
					</fieldset>

					<ButtonContainer>
						<Button type="submit" className={clsx("btn btn-primary", styles.submit_button)}>
							Add
						</Button>
						<Button variant="Transparent" onClick={() => setIsOpen(false)}>
							Cancel
						</Button>
					</ButtonContainer>
				</form>
			</Dialog>
		</>
	);
}
