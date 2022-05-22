import { Button, ButtonContainer, Modal } from '@oliverflecke/components-react';
import SortableDragAndDropList from 'components/SortableDragAndDropList';
import Spinner from 'components/Spinner';
import React, { FC, useCallback, useContext, useMemo, useState } from 'react';
import { AccountContext } from './AccountService';
import { updateAccounts } from './api/accountApi';
import { Account } from './models/Account';

const AccountCard: FC<{ account: Account }> = ({ account }) => {
	return <div>{account.name}</div>;
};

const OrderAccountsModal: FC = () => {
	const {
		state: { accounts },
		dispatch,
	} = useContext(AccountContext);

	const [isOpen, setIsOpen] = useState(false);
	const [state, setState] = useState<'NONE' | 'SAVING' | 'SAVED'>('NONE');
	const [items, setItems] = useState(useMemo(() => accounts, [accounts]));
	const renderCard = useCallback((account: Account) => <AccountCard account={account} />, []);

	const saveOrder = useCallback(async () => {
		try {
			setState('SAVING');
			const order = items.map((a, i) => ({ id: a.id, sortKey: i, name: a.name }));
			await updateAccounts(order);
			dispatch({ type: 'SORT ACCOUNTS', order });
			setState('SAVED');
			setTimeout(() => setState('NONE'), 1000);
		} catch {
			console.warn('Unable to save order of accounts');
			setState('NONE');
		}
	}, [dispatch, items]);

	return (
		<>
			<Button onClick={() => setIsOpen(true)}>Order accounts</Button>
			<Modal isOpen={isOpen} onDismiss={() => setIsOpen(false)}>
				<div className="max-h-screen w-80 max-w-full overflow-y-scroll rounded bg-slate-200 p-4 dark:bg-slate-700">
					<h2 className="modal-header">Reorder accounts</h2>
					<SortableDragAndDropList
						className="m-4 rounded bg-green-500 p-2"
						typeIdentifier="ACCOUNT"
						items={items}
						setItems={setItems}
					>
						{renderCard}
					</SortableDragAndDropList>
					<ButtonContainer>
						<Button buttonType="Secondary" onClick={() => setIsOpen(false)}>
							Close
						</Button>
						<Button onClick={saveOrder}>Save order</Button>
					</ButtonContainer>
				</div>
				{state !== 'NONE' && (
					<div className="absolute top-0 left-0 z-10 flex h-full w-full flex-row items-center justify-center bg-black opacity-75">
						{state === 'SAVING' && <Spinner />}
						{state === 'SAVED' && <div className="text-xl font-bold">Order saved!</div>}
					</div>
				)}
			</Modal>
		</>
	);
};

export default OrderAccountsModal;
