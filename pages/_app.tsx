import { Auth0Provider } from '@auth0/auth0-react';
import 'compiled.css';
import Router from 'next/router';
import Footer from 'features/Footer';
import Header from 'features/Header';
import Settings from 'features/Settings';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onRedirectCallback = (appState: any) => {
	// Use Next.js's Router.replace method to replace the url
	Router.replace(appState?.returnTo || '/');
};

const Layout: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => (
	<>
		<Head>
			<meta charSet="utf-8" />
			<link rel="icon" href="/favicon.ico" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta
				name="theme-color"
				media="(prefers-color-scheme: light)"
				content="#064e3b"
			/>
			<meta
				name="theme-color"
				media="(prefers-color-scheme: dark)"
				content="#064e3b"
			/>
			<meta name="description" content="Finance tracker" />
			<link rel="apple-touch-icon" href="/logo192.png" />
			<link rel="manifest" href="/manifest.json" />
			<meta name="color-scheme" content="dark light" />
			<script
				async
				defer
				data-api="https://plausible.oliverflecke.me/api/event"
				data-domain="finance.oliverflecke.me"
				src="https://plausible.oliverflecke.me/js/script.js"
			></script>
		</Head>
		<Auth0Provider
			domain={process.env.NEXT_PUBLIC_DOMAIN ?? ''}
			clientId={process.env.NEXT_PUBLIC_CLIENT_ID ?? ''}
			onRedirectCallback={onRedirectCallback}
			cacheLocation="localstorage"
			useRefreshTokens={true}
			authorizationParams={{
				redirect_uri:
					typeof window !== 'undefined'
						? process.env.NEXT_PUBLIC_REDIRECT_URI
						: undefined,
				audience: process.env.NEXT_PUBLIC_AUDIENCE,
				scope: 'account:read profile',
			}}
		>
			<Settings>
				<div className="flex min-h-screen flex-col">
					<Header />
					<main className="h-full grow bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-200">
						<Component {...pageProps} />
					</main>
					<Footer />
				</div>
			</Settings>
		</Auth0Provider>
	</>
);

export default Layout;
