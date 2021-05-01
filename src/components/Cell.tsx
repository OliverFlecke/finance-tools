import React, { FC, useCallback, useRef } from 'react';
import { Account, DateEntry } from '../models/Account';

interface CellProps {
	account: Account;
	entry: DateEntry;
}

const Cell: FC<CellProps> = ({ account, entry }: CellProps) => {
	const entryRef = useRef<HTMLTableDataCellElement>(null);
	const onInput = useCallback(
		(x: React.FormEvent<HTMLTableDataCellElement>) => {
			const amount = Number.parseFloat(x.currentTarget.innerText);
			console.log(`Amount: ${amount}`);
			if (amount !== NaN) {
				entry[account.name] = amount;
			}
		},
		[entry, account]
	);

	return (
		<td
			key={account.name}
			contentEditable
			ref={entryRef}
			onInput={onInput}
			className="px-2 text-right"
		>
			{entry[account.name]}
		</td>
	);
};

export default Cell;
