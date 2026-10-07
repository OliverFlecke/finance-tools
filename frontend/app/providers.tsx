"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { userManager } from "api/auth";
import Footer from "features/Footer";
import Header from "features/Header";
import Settings from "features/Settings";
import type React from "react";
import { AuthProvider } from "react-oidc-context";
import styles from "./providers.module.css";

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
					<div className={styles.wrapper}>
						<Header />
						<main className={styles.main}>{children}</main>
						<Footer />
					</div>
				</Settings>
			</QueryClientProvider>
		</AuthProvider>
	);
}
