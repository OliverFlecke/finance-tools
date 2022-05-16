import { Button, ButtonContainer, Modal } from '@oliverflecke/components-react';
import SortableDragAndDropList from 'components/SortableDragAndDropList';
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
	const [items, setItems] = useState(useMemo(() => accounts, [accounts]));
	const renderCard = useCallback((account: Account) => <AccountCard account={account} />, []);

	const saveOrder = useCallback(async () => {
		try {
			const order = items.map((a, i) => ({ id: a.id, sortKey: i, name: a.name }));
			await updateAccounts(order);
			dispatch({ type: 'SORT ACCOUNTS', order });
		} catch {
			console.warn('Unable to save order of accounts');
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
						<Button onClick={saveOrder}>Save order</Button>
					</ButtonContainer>
				</div>
			</Modal>
		</>
	);
};

export default OrderAccountsModal;
