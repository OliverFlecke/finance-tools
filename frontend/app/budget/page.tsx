import Budget from "features/Budget";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Budget" };

export default function BudgetPage() {
	return <Budget />;
}
