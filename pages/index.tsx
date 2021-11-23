import React from 'react';
import AccountOverview from 'features/AccountOverview';
import SEO from '../src/components/SEO';

const AccountTracker: React.FC = () => {
	return (
		<>
			<SEO title="Accounts" />
			<AccountOverview />
		</>
	);
};

export default AccountTracker;
