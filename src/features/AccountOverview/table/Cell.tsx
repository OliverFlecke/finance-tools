import { type ChangeEvent, useCallback, useContext, useRef } from "react";
import { formatCurrency, parseNumber } from "utils/converters";
import { AccountContext } from "../AccountService";
import { useUpdateEntryCallback } from "../api/accountApi";
import type { Account, DateEntry } from "../models/Account";
import styles from "./Cell.module.css";

interface CellProps {
	account: Account;
	entry: DateEntry;
	date: string;
}

export default function Cell({ account, entry, date }: Readonly<CellProps>) {
	const { dispatch } = useContext(AccountContext);
	const entryRef = useRef<HTMLTableCellElement>(null);

	const updateEntryCallback = useUpdateEntryCallback();
	const onBlur = useCallback(
		async (element: ChangeEvent<HTMLTableCellElement>) => {
			const amount = parseNumber(element.currentTarget.innerText);
			if (Number.isNaN(amount)) {
				return;
			}

			await updateEntryCallback({
				date,
				amount,
				accountId: account.id,
			});
			dispatch({
				type: "EDIT ENTRY FOR ACCOUNT",
				name: account.name,
				key: date,
				value: amount,
			});
		},
		[account.id, account.name, date, dispatch, updateEntryCallback],
	);

	const value = formatCurrency(entry[account.name], account.currency);

	return (
		<td
			key={account.name}
			contentEditable={true}
			suppressContentEditableWarning={true}
			ref={entryRef}
			onBlur={onBlur}
			className={styles.container}
		>
			{value}
		</td>
	);
}
