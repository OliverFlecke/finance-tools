import React, { useCallback, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { getValueColorIndicator } from 'utils/colors';
import { formatCurrency, useConverter } from 'utils/converters';
import { formatDate } from 'utils/date';
import SettingsContext from 'features/Settings/context';
import {
	useDeleteStockLotCallback,
	useUpdateStockLotCallback,
} from './API/stockApi';
import { Stock, StockLot } from './models';
import { StockContext } from './state';
import DeleteButton from '../../components/DeleteButton';

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

const StockLotRow: React.FC<StockLotRowProps> = ({
	stock,
	lot,
}: StockLotRowProps) => {
	const { dispatch } = useContext(StockContext);
	const updateStockLot = useUpdateStockLotCallback();
	const deleteStockLot = useDeleteStockLotCallback();

	const {
		values: { currencyRates, preferredDisplayCurrency },
	} = useContext(SettingsContext);
	const { register, handleSubmit, watch } = useForm<LotForm>({
		mode: 'onChange',
		defaultValues: {
			...lot,
			buyDate: formatDate(lot.buyDate),
		},
	});

	const onChange = useCallback(
		async (input: LotForm) => {
			if (input.buyDate === '') return;

			const lot = {
				shares: Number(input.shares),
				buyPrice: Number(input.buyPrice),
				buyDate: new Date(Date.parse(input.buyDate.toString())),
				buyBrokerage: 0,
			};

			await updateStockLot(input.id, lot);

			dispatch({
				type: 'EDIT LOT',
				symbol: stock.symbol,
				lot: {
					...lot,
					id: input.id,
				},
			});
		},
		[dispatch, stock.symbol, updateStockLot]
	);
	const deleteLot = useCallback(async () => {
		await deleteStockLot(lot.id);
		dispatch({ type: 'DELETE LOT', symbol: stock.symbol, id: lot.id });
	}, [deleteStockLot, dispatch, lot.id, stock.symbol]);

	const convert = useConverter(
		stock.currency,
		preferredDisplayCurrency,
		currencyRates.usd
	);

	const marketValue = watch('shares') * stock.regularMarketPrice;
	const buyMarketValue = watch('buyPrice') * watch('shares');
	const gain = marketValue - buyMarketValue;

	return (
		<tr className="odd:bg-gray-200 dark:odd:bg-gray-600">
			<td colSpan={3}>
				<form
					onChange={handleSubmit(onChange)}
					className="flex w-full flex-row justify-evenly"
				>
					<input
						type="date"
						{...register('buyDate')}
						className="bg-transparent"
					/>
					<input
						type="number"
						{...register('shares')}
						className="w-20 bg-transparent text-center"
					/>
					<input
						type="number"
						{...register('buyPrice')}
						className="w-20 bg-transparent text-center"
					/>
				</form>
			</td>
			<td className="text-right">
				{formatCurrency(convert(marketValue), preferredDisplayCurrency)}
			</td>
			<td
				className={`${getValueColorIndicator(gain)} flex flex-col text-right`}
			>
				<span>{formatCurrency(convert(gain), preferredDisplayCurrency)}</span>
				<span>{((marketValue / buyMarketValue - 1) * 100).toFixed(2)} %</span>
			</td>
			<td className="pl-4">
				<DeleteButton onClick={deleteLot} />
			</td>
		</tr>
	);
};

export default StockLotRow;
