import SEO from 'components/SEO';
import TaxCalculator from 'features/TaxCalculator';
import React from 'react';

const TaxCalculatorPage: React.FC = () => (
	<>
		<SEO title="Tax calculator" />
		<TaxCalculator />
	</>
);

export default TaxCalculatorPage;
