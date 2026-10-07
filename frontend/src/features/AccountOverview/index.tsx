"use client";

import AddAccount from "features/AccountOverview/AddAccountModal";
import { withAuthenticationRequired } from "react-oidc-context";
import AddEntryModal from "./AddEntryModal";
import Context from "./Context";
import styles from "./index.module.css";
import OverviewChart from "./OverviewChart";
import Table from "./table";

export default withAuthenticationRequired(AccountOverview, {
	OnRedirecting: () => <div>Redirecting you to the login page</div>,
});

function AccountOverview() {
	return (
		<Context>
			<Table />
			<div className={styles.actions}>
				<AddAccount />
				{/* <OrderAccountsModal /> */}
				<AddEntryModal />
			</div>
			<OverviewChart />
		</Context>
	);
}
