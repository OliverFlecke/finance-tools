import { Button, ButtonContainer, Input, Modal } from '@oliverflecke/components-react';
import React, { useCallback, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
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
		(stock: Stock) => {
			// TODO: Check that the symbol exists and get the latest data from API
			dispatch({
				type: 'ADD_STOCK',
				stock: ({
					symbol: stock.symbol,
					regularMarketPrice: 100,
					lots: [],
				} as unknown) as Stock,
			});
			reset();
		},
		[dispatch, reset]
	);

	return (
		<>
			<button className="btn btn-primary" onClick={() => setIsOpen(true)}>
				Add symbol
			</button>

			<Modal isOpen={isOpen} onDismiss={() => setIsOpen(false)}>
				<div className="p-4">
					<h3 className="text-lg font-bold">Add symbol</h3>

					<form onSubmit={handleSubmit(addSymbol)}>
						<div className="p-4">
							<fieldset className="space-y-2">
								<Input
									placeholder="AAPL, MSFT..."
									label="Symbol"
									{...register('symbol', { required: true })}
									errorMessage={errors.symbol && 'Please provide a symbol to add'}
								/>
							</fieldset>
						</div>

						<ButtonContainer>
							<Button buttonType="Transparent" onClick={() => setIsOpen(false)}>
								Cancel
							</Button>
							<Button type="submit">Add</Button>
						</ButtonContainer>
					</form>
				</div>
			</Modal>
		</>
	);
};

export default AddStock;
