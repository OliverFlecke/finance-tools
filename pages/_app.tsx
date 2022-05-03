import 'compiled.css';
import Header from 'features/Header';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import Settings from 'features/Settings';

const Layout: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => (
	<>
		<Head>
			<meta charSet="utf-8" />
			<link rel="icon" href="/favicon.ico" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="theme-color" media="(prefers-color-scheme: light)" content="#064e3b" />
			<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#064e3b" />
			<meta name="description" content="Finance tracker" />
			<link rel="apple-touch-icon" href="/logo192.png" />
			<link rel="manifest" href="/manifest.json" />
			<meta name="color-scheme" content="dark light" />
		</Head>
		<main className="min-h-screen h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200">
			<Settings>
				<Header />
				<Component {...pageProps} />
			</Settings>
		</main>
	</>
);

export default Layout;
