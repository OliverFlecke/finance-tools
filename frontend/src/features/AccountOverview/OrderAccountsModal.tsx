import SortableDragAndDropList from "components/SortableDragAndDropList";
import { Shuffle } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useUpdateAccountOrderMutation } from "@/api/account";
import type { Account } from "@/api/generated/types.gen";
import Spinner from "@/components/Spinner";
import { Button } from "@/ui/Button/Button";
import { Dialog } from "@/ui/Dialog/Dialog";
import { useAccountContext } from "./Context";
import styles from "./OrderAccountsModal.module.css";

export default function OrderAccountsModal() {
	const { accounts } = useAccountContext();

	const [items, setItems] = useState(accounts);
	const ref = useRef<HTMLDialogElement>(null);

	const { mutate, isPending } = useUpdateAccountOrderMutation();
	const saveOrder = () =>
		mutate(items, {
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
					items={items}
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
	return <div>{account.name}</div>;
}
