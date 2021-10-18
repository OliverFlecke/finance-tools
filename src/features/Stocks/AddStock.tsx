import { Button, ButtonContainer, Input, Modal } from '@oliverflecke/components-react';
import React, { useCallback, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoAddCircleOutline } from 'react-icons/io5';
import { trackStock } from './API/stockApi';
import { getShares } from './API/yahoo';
import { Stock } from './models';
import { StockContext } from './state';

const AddStock: React.FC = () => {
	const { dispatch } = useContext(StockContext);
	const [isOpen, setIsOpen] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<Stock>();

	const addSymbol = useCallback(
		async (stock: Stock) => {
			const quotes = await getShares(stock.symbol);

			if (quotes.length === 0) {
				// TODO: Better error dialog to inform user that stock quote was not found
				alert(`Stock with symbol '${stock.symbol}' was not found`);
			} else {
				await trackStock(stock.symbol);
				dispatch({
					type: 'ADD_STOCK',
					stock: {
						...quotes[0],
						symbol: stock.symbol,
						lots: [],
					},
				});
				reset();
			}
		},
		[dispatch, reset]
	);

	return (
		<>
			<button className="btn btn-primary space-x-2" onClick={() => setIsOpen(true)}>
				<IoAddCircleOutline className="inline" />
				<span className="align-middle">Add symbol</span>
			</button>

			<Modal isOpen={isOpen} onDismiss={() => setIsOpen(false)}>
				<div className="p-4 rounded bg-coolGray-300 dark:bg-coolGray-700">
					<h3 className="text-lg font-bold pb-4">Add symbol</h3>

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
							<Button type="submit" className="btn btn-primary ml-4 order-last">
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
