import AccountOverview from "features/AccountOverview";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Accounts" };

export default function AccountTracker() {
	return <AccountOverview />;
}
