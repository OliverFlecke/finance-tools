import { type ChangeEvent, useRef } from "react";
import { formatCurrency, parseNumber } from "utils/converters";
import { useAddEntryMutation } from "@/api/account";
import type { Account } from "@/api/generated/dist";
import type { DateEntry } from "../models/Account";
import styles from "./Cell.module.css";

interface CellProps {
	account: Account;
	entry: DateEntry;
	date: Date;
}

export default function Cell({ account, entry, date }: Readonly<CellProps>) {
	const entryRef = useRef<HTMLTableCellElement>(null);

	const { mutate } = useAddEntryMutation();
	const onBlur = async (element: ChangeEvent<HTMLTableCellElement>) => {
		const amount = parseNumber(element.target.innerText);
		if (Number.isNaN(amount)) {
			return;
		}

		mutate({ id: account.id, date, amount }, { onError: (err) => console.error(err) });
		element.target.innerText = formatCurrency(amount, account.currency);
	};

	return (
		<td
			key={account.id}
			contentEditable={true}
			suppressContentEditableWarning={true}
			ref={entryRef}
			onBlur={onBlur}
			className={styles.container}
		>
			{formatCurrency(entry[account.id], account.currency)}
		</td>
	);
}
