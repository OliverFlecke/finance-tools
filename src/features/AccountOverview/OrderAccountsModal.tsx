import SortableDragAndDropList from 'components/SortableDragAndDropList';
import React, { FC, useCallback, useContext, useMemo, useState } from 'react';
import { AccountContext } from './AccountService';
import { Account } from './models/Account';

const AccountCard: FC<{ account: Account }> = ({ account }) => {
	return <div>{account.name}</div>;
};

const OrderAccountsModal: FC = () => {
	const {
		state: { accounts },
	} = useContext(AccountContext);

	const [items, setItems] = useState(useMemo(() => accounts, [accounts]));
	const renderCard = useCallback((account: Account) => <AccountCard account={account} />, []);

	return (
		<SortableDragAndDropList
			className="m-4 rounded bg-green-500 p-2"
			typeIdentifier="ACCOUNT"
			items={items}
			setItems={setItems}
		>
			{renderCard}
		</SortableDragAndDropList>
	);
};

export default OrderAccountsModal;
