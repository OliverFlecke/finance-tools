import { Button, ButtonContainer, Input, Modal } from '@oliverflecke/components-react';
import React, { FC, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoAddCircleOutline } from 'react-icons/io5';
import { Account } from './models/Account';

interface AddAccountProps {
	addAccount: (account: Account) => void;
}

const AddAccount: FC<AddAccountProps> = ({ addAccount }: AddAccountProps) => {
	const [showPrompt, setShowPrompt] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Account>();
	const close = useCallback(() => setShowPrompt(false), [setShowPrompt]);
	const onSubmit = (account: Account) => {
		addAccount(account);
		close();
	};

	return (
		<>
			<button onClick={() => setShowPrompt((x) => !x)} className="btn btn-primary space-x-2">
				<IoAddCircleOutline className="inline" />
				<span className="align-middle">Add account</span>
			</button>
			<Modal isOpen={showPrompt} onDismiss={close}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="p-4">
						<h2 className="text-lg text-gray-700 dark:text-gray-400">Add new account</h2>

						<fieldset className="space-y-2">
							<Input
								placeholder="Savings, Investments..."
								label="Name"
								{...register('name', { required: true })}
								errorMessage={errors.name && 'Please provide a name for your account'}
							/>
							<label className="flex flex-col space-y-2">
								<span className="text-gray-700 dark:text-gray-300 font-medium text-sm">Type</span>
								<select
									className="py-2 px-4 rounded-md shadow focus:outline-none focus:ring focus:border-indigo-400 bg-white dark:bg-gray-900 dark:text-gray-100 undefined"
									{...register('type', { required: true })}
								>
									<option value={'Cash'}>Cash</option>
									<option value={'Investment'}>Investment</option>
								</select>
							</label>
						</fieldset>
					</div>

					<ButtonContainer>
						<Button buttonType="Transparent" onClick={close}>
							Cancel
						</Button>
						<Button type="submit">Add</Button>
					</ButtonContainer>
				</form>
			</Modal>
		</>
	);
};

export default AddAccount;
