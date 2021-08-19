import React, { useCallback, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { getValueColorIndicator } from 'utils/colors';
import { formatDate } from 'utils/date';
import DeleteIcon from '../../icons/DeleteIcon';
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

	const marketValue = watch('shares') * stock.currentValue;
	const gain = marketValue - watch('price') * watch('shares');

	return (
		<tr className="odd:bg-coolGray-600">
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
			<td className="text-right">{marketValue}</td>
			<td className={`${getValueColorIndicator(gain)} text-right`}>{gain}</td>
			<td className="w-14 text-red-800 dark:text-red-500">
				<div className="hover:cursor-pointer" onClick={deleteLot}>
					<DeleteIcon />
				</div>
			</td>
		</tr>
	);
};

export default StockLotRow;
