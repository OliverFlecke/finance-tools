import React from 'react';
import SEO from 'components/SEO';
import TextPage from 'components/TextPage';

const Index: React.FC = () => {
	return (
		<>
			<SEO title="Privacy" />
			<TextPage>
				<h2>Privacy</h2>
				<p>
					Some functionality on this page sends and stores data server side. All
					of this data is connected to the currently logged in account, and
					therefore NOT anonymized. Everything sent over the wire is encrypted
					(TLS) and stored on encrypted disks. However, as this is just a hobby
					project at the moment, and while I have no plans to (nor never will
					have) ever share/sell <b>any</b> data, I take no responsibility for
					stolen or lost data. Use at your <b>own</b> risk.
				</p>
				<p>
					In regards to cookies, only strictly necessary cookies and other data
					are stored on the client side. This is limited to your authentication
					cookie (currently only support for Github), and use of local storage
					to cache any data you enter on this page.
				</p>
			</TextPage>
		</>
	);
};

export default Index;
