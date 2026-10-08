import SortableDragAndDropList from "components/SortableDragAndDropList";
import Spinner from "components/Spinner";
import { Shuffle } from "lucide-react";
import { type FC, useCallback, useContext, useMemo, useState } from "react";
import { Button } from "@/ui/Button/Button";
import { ButtonContainer } from "@/ui/ButtonContainer/ButtonContainer";
import { Dialog } from "@/ui/Dialog/Dialog";
import { AccountContext } from "./AccountService";
import { useUpdateAccountsCallback } from "./api/accountApi";
import type { Account } from "./models/Account";
import styles from "./OrderAccountsModal.module.css";

const AccountCard: FC<{ account: Account }> = ({ account }) => {
	return <div>{account.name}</div>;
};

const OrderAccountsModal: FC = () => {
	const {
		state: { accounts },
		dispatch,
	} = useContext(AccountContext);

	const [state, setState] = useState<"NONE" | "SAVING" | "SAVED">("NONE");
	const [items, setItems] = useState(useMemo(() => accounts, [accounts]));
	const renderCard = useCallback((account: Account) => <AccountCard account={account} />, []);

	const updateAccountCallback = useUpdateAccountsCallback();
	const saveOrder = useCallback(async () => {
		try {
			setState("SAVING");
			const order = items.map((a, i) => ({
				id: a.id,
				sortKey: i,
				name: a.name,
			}));
			await updateAccountCallback(order);
			dispatch({ type: "SORT ACCOUNTS", order });
			setState("SAVED");
			setTimeout(() => setState("NONE"), 1000);
		} catch {
			console.warn("Unable to save order of accounts");
			setState("NONE");
		}
	}, [dispatch, items, updateAccountCallback]);

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
				<h2 className={styles.header}>Reorder accounts</h2>
				<SortableDragAndDropList
					className={styles.list}
					typeIdentifier="ACCOUNT"
					items={items}
					setItems={setItems}
				>
					{renderCard}
				</SortableDragAndDropList>
				<ButtonContainer>
					<Button onClick={saveOrder}>Save order</Button>
				</ButtonContainer>
			</div>

			{state !== "NONE" && (
				<div className={styles.overlay}>
					{state === "SAVING" && <Spinner />}
					{state === "SAVED" && <div className={styles.saved_message}>Order saved!</div>}
				</div>
			)}
		</Dialog>
	);
};

export default OrderAccountsModal;
