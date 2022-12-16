import Head from 'next/head';
import React from 'react';

interface SEOProps {
	title: string;
}

const SEO: React.FC<SEOProps> = ({ title }: SEOProps) => {
	const text = `${title} | Finance`;

	return (
		<Head>
			<title>{text}</title>
		</Head>
	);
};

export default SEO;
