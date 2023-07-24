import {
	Button,
	ButtonContainer,
	Input,
	Modal,
} from '@oliverflecke/components-react';
import React, { useCallback, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoAddCircleOutline } from 'react-icons/io5';
import { useTrackStockCallback } from './API/stockApi';
import { useSharesCallback } from './API/yahoo';
import { Stock } from './models';
import { StockContext } from './state';

const AddStock: React.FC = () => {
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
					type: 'ADD STOCK',
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
				className="btn btn-primary space-x-2"
				onClick={() => setIsOpen(true)}
			>
				<IoAddCircleOutline className="inline" />
				<span className="align-middle">Add symbol</span>
			</button>

			<Modal isOpen={isOpen} onDismiss={() => setIsOpen(false)}>
				<div className="rounded bg-gray-300 p-4 dark:bg-gray-700">
					<h3 className="pb-4 text-lg font-bold">Add symbol</h3>

					<form onSubmit={handleSubmit(addSymbol)} className="space-y-4">
						<fieldset className="space-y-2">
							<Input
								placeholder="AAPL, MSFT..."
								label="Symbol"
								{...register('symbol', { required: true })}
								errorMessage={errors.symbol && 'Please provide a symbol to add'}
							/>
						</fieldset>

						<ButtonContainer>
							<Button type="submit" className="btn btn-primary order-last ml-4">
								Add
							</Button>
							<Button buttonType="Transparent" onClick={() => setIsOpen(false)}>
								Cancel
							</Button>
						</ButtonContainer>
					</form>
				</div>
			</Modal>
		</>
	);
};

export default AddStock;
