import CompoundInterest from "features/CompoundInterest";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Interest calculator" };

export default function CompoundInterestCalculatorPage() {
	return <CompoundInterest />;
}
