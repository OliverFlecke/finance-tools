import { Button, ButtonContainer, Input, Modal } from '@oliverflecke/components-react';
import React, { FC, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Account } from '../models/Account';

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
		console.log(`Adding account: ${account}`);
		addAccount(account);
		close();
	};

	return (
		<>
			<Button onClick={() => setShowPrompt((x) => !x)}>Add account</Button>
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
							<Input
								placeholder="Cash, Investment..."
								label="Type"
								{...register('type', { required: true })}
								errorMessage={errors.type && 'Please choose cash or investment'}
							/>
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
