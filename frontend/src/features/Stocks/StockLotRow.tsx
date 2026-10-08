import clsx from "clsx";
import SettingsContext from "features/Settings/context";
import { Trash } from "lucide-react";
import { useCallback, useContext } from "react";
import { useForm } from "react-hook-form";
import { getValueColorIndicator } from "utils/colors";
import { formatCurrency, useConverter } from "utils/converters";
import { formatDate } from "utils/date";
import { Button } from "@/ui/Button/Button";
import { useDeleteStockLotCallback, useUpdateStockLotCallback } from "./API/stockApi";
import type { Stock, StockLot } from "./models";
import styles from "./StockLotRow.module.css";
import { StockContext } from "./state";

interface StockLotRowProps {
	stock: Stock;
	lot: StockLot;
}

interface LotForm {
	id: string;
	shares: number;
	buyPrice: number;
	buyDate: string;
}

export default function StockLotRow({ stock, lot }: StockLotRowProps) {
	const { dispatch } = useContext(StockContext);
	const updateStockLot = useUpdateStockLotCallback();
	const deleteStockLot = useDeleteStockLotCallback();

	const {
		values: { currencyRates, preferredDisplayCurrency },
	} = useContext(SettingsContext);
	const { register, handleSubmit, watch } = useForm<LotForm>({
		mode: "onChange",
		defaultValues: {
			...lot,
			buyDate: formatDate(lot.buyDate),
		},
	});

	const onChange = useCallback(
		async (input: LotForm) => {
			if (input.buyDate === "") return;

			const lot = {
				shares: Number(input.shares),
				buyPrice: Number(input.buyPrice),
				buyDate: new Date(Date.parse(input.buyDate.toString())),
				buyBrokerage: 0,
			};

			await updateStockLot(input.id, lot);

			dispatch({
				type: "EDIT LOT",
				symbol: stock.symbol,
				lot: {
					...lot,
					id: input.id,
				},
			});
		},
		[dispatch, stock.symbol, updateStockLot],
	);
	const deleteLot = useCallback(async () => {
		await deleteStockLot(lot.id);
		dispatch({ type: "DELETE LOT", symbol: stock.symbol, id: lot.id });
	}, [deleteStockLot, dispatch, lot.id, stock.symbol]);

	const convert = useConverter(stock.currency, preferredDisplayCurrency, currencyRates.usd);

	const marketValue = watch("shares") * stock.regularMarketPrice;
	const buyMarketValue = watch("buyPrice") * watch("shares");
	const gain = marketValue - buyMarketValue;

	return (
		<tr className={styles.row}>
			<td colSpan={3}>
				<form onChange={handleSubmit(onChange)} className={styles.form}>
					<input type="date" {...register("buyDate")} className={styles.date_input} />
					<input type="number" {...register("shares")} className={styles.number_input} />
					<input type="number" {...register("buyPrice")} className={styles.number_input} />
				</form>
			</td>
			<td className={styles.value_cell}>
				{formatCurrency(convert(marketValue), preferredDisplayCurrency)}
			</td>
			<td className={clsx(getValueColorIndicator(gain), styles.gain_cell)}>
				<span>{formatCurrency(convert(gain), preferredDisplayCurrency)}</span>
				<span>{((marketValue / buyMarketValue - 1) * 100).toFixed(2)} %</span>
			</td>
			<td className={styles.delete_cell}>
				<Button onClick={deleteLot} icon variant="Danger">
					<Trash />
				</Button>
			</td>
		</tr>
	);
}
