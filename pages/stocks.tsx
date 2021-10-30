import React from 'react';
import Stocks from 'features/Stocks';
import SEO from '../src/components/SEO';

const StocksPage: React.FC = () => (
	<>
		<SEO title="Stocks" />
		<Stocks />
	</>
);

export default StocksPage;
