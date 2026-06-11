import Stocks from 'features/Stocks'
import React from 'react'
import ClientOnly from '../src/components/ClientOnly'
import SEO from '../src/components/SEO'

const StocksPage: React.FC = () => (
	<>
		<SEO title="Stocks" />
		<ClientOnly>
			<Stocks />
		</ClientOnly>
	</>
)

export default StocksPage
