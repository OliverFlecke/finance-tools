import Link from 'next/link';
import React from 'react';

const Footer = () => (
	<footer className="flex h-full flex-row-reverse rounded bg-green-900 px-4 pb-4 pt-2 text-gray-300">
		<Link href="/privacy">Privacy and data</Link>
	</footer>
);

export default Footer;
