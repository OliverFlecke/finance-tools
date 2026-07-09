import SEO from "components/SEO";
import Budget from "features/Budget";
import type React from "react";

const BudgetPage: React.FC = () => (
	<>
		<SEO title="Budget" />
		<Budget />
	</>
);

export default BudgetPage;
