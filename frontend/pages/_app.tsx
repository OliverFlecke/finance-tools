import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { userManager } from "api/auth";
import "compiled.css";
import Footer from "features/Footer";
import Header from "features/Header";
import Settings from "features/Settings";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { AuthProvider } from "react-oidc-context";

const queryClient = new QueryClient();

export default function Layout({ Component, pageProps }: AppProps) {
	return (
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
			<Script
				async
				defer
				data-api="https://plausible.oliverflecke.me/api/event"
				data-domain="finance.oliverflecke.me"
				src="https://plausible.oliverflecke.me/js/script.js"
			/>
			<AuthProvider
				userManager={userManager}
				onSigninCallback={() => {
					const url = new URL(window.location.href);
					url.searchParams.delete("code");
					url.searchParams.delete("state");
					window.history.replaceState({}, document.title, url.toString());
				}}
			>
				<QueryClientProvider client={queryClient}>
					<Settings>
						<div className="flex min-h-screen flex-col">
							<Header />
							<main className="h-full grow bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-200 relative">
								<Component {...pageProps} />
							</main>
							<Footer />
						</div>
					</Settings>
				</QueryClientProvider>
			</AuthProvider>
		</>
	);
}
