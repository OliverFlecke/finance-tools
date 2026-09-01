"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { userManager } from "api/auth";
import Footer from "features/Footer";
import Header from "features/Header";
import Settings from "features/Settings";
import type React from "react";
import { AuthProvider } from "react-oidc-context";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
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
							{children}
						</main>
						<Footer />
					</div>
				</Settings>
			</QueryClientProvider>
		</AuthProvider>
	);
}
