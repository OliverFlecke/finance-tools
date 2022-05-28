import React from 'react';
import SEO from 'components/SEO';
import CompoundInterest from 'features/CompoundInterest';

const CompoundInterestCalculatorPage: React.FC = () => (
	<>
		<SEO title="Interest calculator" />
		<CompoundInterest />
	</>
);

export default CompoundInterestCalculatorPage;
