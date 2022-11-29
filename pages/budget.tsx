import SEO from 'components/SEO';
import React from 'react';
import Budget from 'features/Budget';

const BudgetPage: React.FC = () => (
	<>
		<SEO title="Budget" />
		<Budget />
	</>
);

export default BudgetPage;
