import React, { FC, useCallback, useContext, useRef } from 'react';
import { formatCurrency, parseNumber } from 'utils/converters';
import { AccountContext } from './AccountService';
import { updateEntry } from './api/accountApi';
import { Account, DateEntry } from './models/Account';

interface CellProps {
	account: Account;
	entry: DateEntry;
	date: string;
}

const Cell: FC<CellProps> = ({ account, entry, date }: CellProps) => {
	const { dispatch } = useContext(AccountContext);
	const entryRef = useRef<HTMLTableCellElement>(null);
	const onBlur = useCallback(
		async (element: React.FormEvent<HTMLTableCellElement>) => {
			const amount = parseNumber(element.currentTarget.innerText);
			await updateEntry({
				date,
				amount,
				accountId: account.id,
			});
			dispatch({
				type: 'EDIT ENTRY FOR ACCOUNT',
				name: account.name,
				key: date,
				value: amount,
			});
		},
		[account.id, account.name, date, dispatch]
	);

	const value = formatCurrency(entry[account.name], account.currency);

	return (
		<td
			key={account.name}
			contentEditable
			ref={entryRef}
			onBlur={onBlur}
			className="px-4 text-right"
		>
			{value}
		</td>
	);
};

export default Cell;
