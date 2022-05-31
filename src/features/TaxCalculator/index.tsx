import React from 'react';
import TaxTable from './TaxTable';

const TaxCalculator: React.FC = () => {
	const salary = 500_000; // TODO: Needs input

	return (
		<>
			<TaxTable salary={salary} />
		</>
	);
};

export default TaxCalculator;
