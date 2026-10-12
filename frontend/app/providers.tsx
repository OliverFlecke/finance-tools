"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { userManager } from "api/auth";
import Footer from "features/Footer";
import Header from "features/Header";
import Settings from "features/Settings";
import type React from "react";
import { AuthProvider } from "react-oidc-context";
import { client } from "@/api/generated/client.gen";
import styles from "./providers.module.css";

const queryClient = new QueryClient();

client.setConfig({
	baseUrl: process.env.NEXT_PUBLIC_API_HOST,
	auth: async () => {
		const user = await userManager.getUser();
		if (user && !user.expired) {
			return user.access_token;
		}

		if (typeof window === "undefined") {
			return;
		}

		const renewedUser = await userManager.signinSilent();
		return renewedUser?.access_token;
	},
});

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<AuthProvider
			onSigninCallback={() => {
				const url = new URL(window.location.href);
				url.searchParams.delete("code");
				url.searchParams.delete("state");
				window.history.replaceState({}, document.title, url.toString());
			}}
			userManager={userManager}
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
