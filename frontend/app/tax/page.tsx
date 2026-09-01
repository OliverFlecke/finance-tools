import TaxCalculator from "features/TaxCalculator";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Tax calculator" };

export default function TaxCalculatorPage() {
	return <TaxCalculator />;
}
