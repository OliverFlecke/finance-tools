import SEO from 'components/SEO';
import AccountOverview from 'features/AccountOverview';
import React from 'react';

const AccountTracker: React.FC = () => {
	return (
		<>
			<SEO title="Accounts" />
			<AccountOverview />
		</>
	);
};

export default AccountTracker;
