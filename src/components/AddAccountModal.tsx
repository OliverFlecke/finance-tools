import {
	Button,
	ButtonContainer,
	Input,
	Modal,
} from '@oliverflecke/components-react';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import AccountService from '../services/AccountService';

interface AddAccountProps {
	accountService: AccountService;
}

const AddAccount: FC<AddAccountProps> = ({
	accountService,
}: AddAccountProps) => {
	const [showPrompt, setShowPrompt] = useState(true);
	const { register, handleSubmit } = useForm();
	const onSubmit = (data: any) => {
		console.log(data);
		accountService.add({
			name: data.name,
			type: data.type,
		});
	};

	return (
		<div>
			<Button onClick={() => setShowPrompt((x) => !x)}>Add account</Button>
			<Modal isOpen={showPrompt}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="p-4">
						<h2 className="text-lg text-gray-700 dark:text-gray-400">
							Add new account
						</h2>

						<div className="space-y-2">
							<Input
								placeholder="Savings, Investments..."
								label="Name"
								{...register('name')}
							/>
							<Input
								placeholder="Cash, Investments..."
								label="Type"
								{...register('type')}
							/>
						</div>
					</div>

					<ButtonContainer>
						<Button
							buttonType="Transparent"
							onClick={() => setShowPrompt(false)}
						>
							Cancel
						</Button>
						<Button type="submit">Add</Button>
					</ButtonContainer>
				</form>
			</Modal>
		</div>
	);
};

export default AddAccount;
