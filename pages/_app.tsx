import 'compiled.css';
import React from 'react';
import type { AppProps } from 'next/app';
import Header from 'features/Header';
import Head from 'next/head';

const Layout: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => (
	<>
		<Head>
			<meta charSet="utf-8" />
			<link rel="icon" href="/favicon.ico" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="theme-color" content="#000000" />
			<meta name="description" content="Finance tracker" />
			<link rel="apple-touch-icon" href="/logo192.png" />
			<link rel="manifest" href="/manifest.json" />
			<meta name="color-scheme" content="dark light" />
		</Head>
		<main className="min-h-screen h-full bg-white dark:bg-coolGray-900 text-gray-900 dark:text-gray-200">
			<Header />
			<Component {...pageProps} />
		</main>
	</>
);

export default Layout;
