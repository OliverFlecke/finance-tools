import React from 'react';
import Stocks from 'features/Stocks';
import SEO from '../src/components/SEO';
import ClientOnly from '../src/components/ClientOnly';

const StocksPage: React.FC = () => (
	<>
		<SEO title="Stocks" />
		<ClientOnly>
			<Stocks />
		</ClientOnly>
	</>
);

export default StocksPage;
