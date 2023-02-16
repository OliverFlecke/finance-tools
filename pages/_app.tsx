import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import 'compiled.css';
import Router from 'next/router';
import Footer from 'features/Footer';
import Header from 'features/Header';
import Settings from 'features/Settings';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useEffect } from 'react';

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
				scope: 'account:read',
			}}
		>
			<Settings>
				<div className="flex min-h-screen flex-col">
					<Auth />
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

const Auth = () => {
	const { isAuthenticated, error, user } = useAuth0();

	if (error) {
		console.log(error);
		return <div>Oops... {error.message}</div>;
	}

	if (!isAuthenticated) {
		return (
			<div>
				<div>No user authenticated</div>
				<LoginButton />
			</div>
		);
	}

	console.log(user);

	return (
		<div>
			<UserDisplay />
			<LogoutButton />
			<Authorized />
		</div>
	);
};

const UserDisplay = () => {
	const { user } = useAuth0();

	return <div>{user?.sub}</div>;
};

const Authorized = () => {
	const { getAccessTokenSilently, loginWithRedirect } = useAuth0();
	useEffect(() => {
		(async () => {
			try {
				const token = await getAccessTokenSilently();
			} catch (e: any) {
				if (e.error === 'login_required') {
					loginWithRedirect();
				}
				if (e.error === 'consent_required') {
					loginWithRedirect();
				}
				throw e;
			}
		})();
	}, [getAccessTokenSilently, loginWithRedirect]);

	return <></>;
};

const LoginButton = () => {
	const { loginWithRedirect } = useAuth0();
	return <button onClick={() => loginWithRedirect()}>Login in</button>;
};

const LogoutButton = () => {
	const { isAuthenticated, logout } = useAuth0();

	return isAuthenticated ? (
		<button
			onClick={() => {
				logout({
					logoutParams: {
						returnTo: window.location.origin,
					},
				});
			}}
		>
			Log out
		</button>
	) : (
		<></>
	);
};
