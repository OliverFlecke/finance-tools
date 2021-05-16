import { Button, ButtonContainer, Input, Modal } from '@oliverflecke/components-react';
import React, { FC, memo, useCallback, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AccountContext } from '../services/AccountService';

const AddEntryModal: FC = memo(() => {
	const { dispatch } = useContext(AccountContext);
	const [isOpen, setIsOpen] = useState(false);
	const dismiss = useCallback(() => setIsOpen(false), [setIsOpen]);

	const { register, handleSubmit } = useForm<{ date: string }>();
	const onSubmit = handleSubmit(({ date }) => {
		dispatch({ type: 'add entry', date });
		dismiss();
	});

	return (
		<>
			<Button buttonType="Primary" onClick={() => setIsOpen(true)}>
				Add entry
			</Button>
			<Modal isOpen={isOpen} onDismiss={dismiss}>
				<form onSubmit={onSubmit}>
					<div className="p-4">
						<h2 className="text-lg text-gray-700 dark:text-gray-400">Add new entry on date</h2>
						<Input type="date" className="m-4" {...register('date')} />
					</div>

					<ButtonContainer>
						<Button buttonType="Primary" type="submit">
							Add
						</Button>
					</ButtonContainer>
				</form>
			</Modal>
		</>
	);
});
AddEntryModal.displayName = 'AddEntryModal';

export default AddEntryModal;
