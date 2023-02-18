import React from 'react';
import SEO from 'components/SEO';
import TextPage from 'components/TextPage';
import Link from 'next/link';

const Index: React.FC = () => {
	return (
		<>
			<SEO title="Finance Tracker" />

			<TextPage>
				<h2>Tools to help with your finances</h2>

				<p>
					This page is a collection of difference tools to help track finances
					and help with different standard calculations that people come across.
					These has primarely been made for my own use, and are shared here to
					expand my own development skills, and for whoever else are interested
					in using these.
				</p>

				<h3>Features</h3>
				<ul className="list-disc pl-4">
					<li>
						Overview of your money across <Link href="/accounts">accounts</Link>
					</li>
					<li>
						Track your <Link href="/stocks">stock</Link> portfolio, with live
						price updates
					</li>
					<li>
						A rolling <Link href="/interest">interest</Link> calculator, to help
						savings calculations over time
					</li>
					<li>
						Calculate post-<Link href="/tax">tax</Link> income across different
						countries with different rates and systems
					</li>
					<li>
						Simple <Link href="/budget">budget</Link> app, with options like
						setting a certain percentage for savings
					</li>
				</ul>
			</TextPage>
		</>
	);
};

export default Index;
