import React, { useCallback, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { IoTrashOutline } from 'react-icons/io5';
import { getValueColorIndicator } from 'utils/colors';
import { formatCurrency } from 'utils/converters';
import { formatDate } from 'utils/date';
import { Stock, StockLot } from './models';
import { StockContext } from './state';

interface StockLotRowProps {
	stock: Stock;
	lot: StockLot;
}

interface LotForm {
	id: string;
	shares: number;
	price: number;
	date: string;
}

const StockLotRow: React.FC<StockLotRowProps> = ({ stock, lot }: StockLotRowProps) => {
	const { dispatch } = useContext(StockContext);
	const { register, handleSubmit, watch } = useForm<LotForm>({
		mode: 'onChange',
		defaultValues: {
			...lot,
			date: formatDate(lot.date),
		},
	});

	const onChange = (lot: LotForm) => {
		if (lot.date === '') return;

		dispatch({
			type: 'EDIT_LOT',
			symbol: stock.symbol,
			lot: {
				id: lot.id,
				shares: Number(lot.shares),
				price: Number(lot.price),
				date: new Date(Date.parse(lot.date.toString())),
			},
		});
	};
	const deleteLot = useCallback(() => {
		dispatch({ type: 'DELETE_LOT', symbol: stock.symbol, id: lot.id });
	}, [dispatch, lot.id, stock.symbol]);

	const marketValue = watch('shares') * stock.regularMarketPrice;
	const gain = marketValue - watch('price') * watch('shares');

	return (
		<tr className="odd:bg-coolGray-200 dark:odd:bg-coolGray-600">
			<td colSpan={3}>
				<form onChange={handleSubmit(onChange)} className="flex flex-row justify-evenly w-full">
					<input type="date" {...register('date')} className="bg-transparent" />
					<input
						type="number"
						{...register('shares')}
						className="bg-transparent w-20 text-center"
					/>
					<input type="number" {...register('price')} className="bg-transparent w-20 text-center" />
				</form>
			</td>
			<td className="text-right">{formatCurrency(marketValue, stock.currency)}</td>
			<td className={`${getValueColorIndicator(gain)} text-right`}>
				{formatCurrency(gain, stock.currency)}
			</td>
			<td>
				<button onClick={deleteLot}>
					<IoTrashOutline className="text-red-700 dark:text-red-500" size={24} />
				</button>
			</td>
		</tr>
	);
};

export default StockLotRow;
