import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Eye, EyeOff, SaveIcon, Shuffle } from "lucide-react";
import { type RefObject, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useUpdateAccountOrderMutation } from "@/api/account";
import {
	getAccountsQueryKey,
	updateAccountMutation,
} from "@/api/generated/@tanstack/react-query.gen";
import type { Account, AccountResponse } from "@/api/generated/types.gen";
import List from "@/ui/SortableList";
import Spinner from "@/components/Spinner";
import { Button } from "@/ui/Button/Button";
import { Dialog } from "@/ui/Dialog/Dialog";
import { useAccountContext } from "./Context";
import styles from "./OrderAccountsModal.module.css";

function useUpdate(ref: RefObject<HTMLDialogElement | null>) {
	const { accounts } = useAccountContext();

	const qc = useQueryClient();
	const setAccounts = (xs: Account[]) => {
		qc.setQueryData<AccountResponse>(getAccountsQueryKey(), (data) => ({ ...data, accounts: xs }));
	};

	const [items, setItems] = useState(accounts);
	useEffect(() => {
		if (accounts) {
			setItems(accounts);
		}
	}, [accounts]);

	const { mutate, isPending } = useUpdateAccountOrderMutation();
	const saveOrder = () => {
		setAccounts(items);
		mutate(items, {
			onError: (err) => {
				setAccounts(accounts);
				toast.error("Failed to save order", { description: err.message });
			},
			onSuccess: (_) => {
				ref.current?.close();
				toast.success("Order saved!");
			},
		});
	};

	return { items, setItems, saveOrder, isPending };
}

export default function OrderAccountsModal() {
	const ref = useRef<HTMLDialogElement>(null);
	const { items, setItems, saveOrder, isPending } = useUpdate(ref);

	return (
		<Dialog
			ref={ref}
			title="Reorder accounts"
			trigger={
				<Button>
					<Shuffle />
					Order accounts
				</Button>
			}
		>
			<div className={styles.panel}>
				<Button disabled={isPending} onClick={saveOrder}>
					{isPending ? <Spinner /> : <SaveIcon />}
					Save order
				</Button>

				<List component={AccountCard} items={items} setItems={setItems} />
			</div>
		</Dialog>
	);
}

function AccountCard(account: Account) {
	const update = useToggleAccountArchived(account);

	return (
		<div className={styles.account}>
			<span>{account.name}</span>

			<Button icon onClick={update} variant="Primary">
				{account.archived ? <EyeOff /> : <Eye />}
			</Button>
		</div>
	);
}

function useToggleAccountArchived(account: Account) {
	const { mutate } = useMutation(updateAccountMutation());
	const qc = useQueryClient();

	const updateAccount = (account: Partial<Account> & Pick<Account, "id">) =>
		qc.setQueryData<AccountResponse>(getAccountsQueryKey(), (data) =>
			!data
				? undefined
				: {
						...data,
						accounts: data.accounts.map((a) => (a.id === account.id ? { ...a, ...account } : a)),
					},
		);

	return () => {
		updateAccount({ id: account.id, archived: !account.archived });

		mutate(
			{ path: { id: account.id }, body: { archived: !account.archived } },
			{
				onError: () => {
					updateAccount({ id: account.id, archived: account.archived });
				},
				onSuccess: (_, { body: { archived } }) => {
					toast.success(`Account ${archived ? "archived" : "unarchived"}`);
				},
			},
		);
	};
}
