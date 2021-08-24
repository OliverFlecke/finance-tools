import React, { FC, useCallback, useContext, useRef } from 'react';
import { Account, DateEntry } from '../models/Account';
import { AccountContext } from '../services/AccountService';
import { currencyFormatter, parseNumber } from '../utils/converters';

interface CellProps {
	account: Account;
	entry: DateEntry;
	date: string;
}

const Cell: FC<CellProps> = ({ account, entry, date }: CellProps) => {
	const { dispatch } = useContext(AccountContext);
	const entryRef = useRef<HTMLTableDataCellElement>(null);
	const onBlur = useCallback(
		(element: React.FormEvent<HTMLTableDataCellElement>) => {
			const amount = parseNumber(element.currentTarget.innerText);
			if (amount !== NaN) {
				dispatch({ type: 'edit entry for account', name: account.name, key: date, value: amount });
			}
		},
		[account.name, date, dispatch]
	);

	const value = currencyFormatter.format(entry[account.name] ?? 0);

	return (
		<td
			key={account.name}
			contentEditable
			ref={entryRef}
			onBlur={onBlur}
			className="px-2 text-right"
		>
			{value}
		</td>
	);
};

export default Cell;
