import { Button } from '@oliverflecke/components-react';
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
			<Button onClick={saveOrder}>Save order</Button>
			<SortableDragAndDropList
				className="m-4 rounded bg-green-500 p-2"
				typeIdentifier="ACCOUNT"
				items={items}
				setItems={setItems}
			>
				{renderCard}
			</SortableDragAndDropList>
		</>
	);
};

export default OrderAccountsModal;
