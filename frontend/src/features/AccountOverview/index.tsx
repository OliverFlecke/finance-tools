import { withAuthenticationRequired } from "@auth0/auth0-react";
import AddAccount from "features/AccountOverview/AddAccountModal";
import AddEntryModal from "./AddEntryModal";
import Context from "./Context";
import OverviewChart from "./OverviewChart";
import Table from "./table";

export default withAuthenticationRequired(AccountOverview, {
	onRedirecting: () => <div>Redirecting you to the login page</div>,
});

function AccountOverview() {
	return (
		<Context>
			<Table />
			<div className="flex flex-row justify-between px-4 relative">
				<AddAccount />
				{/* <OrderAccountsModal /> */}
				<AddEntryModal />
			</div>
			<OverviewChart />
		</Context>
	);
}
