import { useMutation, useQueryClient } from "@tanstack/react-query";
import SortableDragAndDropList from "components/SortableDragAndDropList";
import { Eye, EyeOff, Shuffle } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import { useUpdateAccountOrderMutation } from "@/api/account";
import {
	getAccountsQueryKey,
	updateAccountMutation,
} from "@/api/generated/@tanstack/react-query.gen";
import type { Account, AccountResponse } from "@/api/generated/types.gen";
import Spinner from "@/components/Spinner";
import { Button } from "@/ui/Button/Button";
import { Dialog } from "@/ui/Dialog/Dialog";
import { useAccountContext } from "./Context";
import styles from "./OrderAccountsModal.module.css";

export default function OrderAccountsModal() {
	const { accounts } = useAccountContext();

	const qc = useQueryClient();
	const setItems = () => (xs: Account[]) => {
		qc.setQueryData<AccountResponse>(getAccountsQueryKey(), (data) => ({ ...data, accounts: xs }));
	};

	const ref = useRef<HTMLDialogElement>(null);

	const { mutate, isPending } = useUpdateAccountOrderMutation();
	const saveOrder = () =>
		mutate(accounts, {
			onError: (err) => toast.error("Failed to save order", { description: err.message }),
			onSuccess: () => {
				ref.current?.close();
				toast.success("Order saved!");
			},
		});

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
				<SortableDragAndDropList
					className={styles.list}
					items={accounts}
					setItems={setItems}
					typeIdentifier="ACCOUNT"
				>
					{(a) => <AccountCard account={a} />}
				</SortableDragAndDropList>
				<Button disabled={isPending} onClick={saveOrder}>
					{isPending && <Spinner />}
					Save order
				</Button>
			</div>
		</Dialog>
	);
}

interface AccountCardProps {
	account: Account;
}

function AccountCard({ account }: AccountCardProps) {
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
	return () =>
		mutate(
			{ path: { id: account.id }, body: { archived: !account.archived } },
			{
				onSuccess: (_, { body: { archived } }) => {
					qc.setQueryData<AccountResponse>(getAccountsQueryKey(), (data) =>
						!data
							? undefined
							: {
									...data,
									accounts: data.accounts.map((a) =>
										a.id === account.id ? { ...a, archived: archived ?? false } : a,
									),
								},
					);

					toast.success(`Account ${archived ? "archived" : "unarchived"}`);
				},
			},
		);
}
