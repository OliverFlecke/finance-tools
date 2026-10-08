import SortableDragAndDropList from "components/SortableDragAndDropList";
import { Shuffle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useUpdateAccountOrderMutation } from "@/api/account";
import type { Account } from "@/api/generated/types.gen";
import { Button } from "@/ui/Button/Button";
import { Dialog } from "@/ui/Dialog/Dialog";
import { useAccountContext } from "./Context";
import styles from "./OrderAccountsModal.module.css";

export default function OrderAccountsModal() {
	const { accounts } = useAccountContext();

	const [items, setItems] = useState(accounts);

	const { mutate } = useUpdateAccountOrderMutation();
	const saveOrder = () =>
		mutate(items, {
			onError: (err) => toast.error("Failed to save order", { description: err.message }),
			onSuccess: () => toast.success("Order saved!"),
		});

	return (
		<Dialog
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
				<Button onClick={saveOrder}>Save order</Button>
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
