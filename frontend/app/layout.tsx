import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import type React from "react";
import { Toaster } from "sonner";
import styles from "./layout.module.css";
import Providers from "./providers";

import "main.css";

export const metadata: Metadata = {
	title: { default: "Finance", template: "%s | Finance" },
	description: "Finance tracker",
	icons: {
		icon: "/favicon.ico",
		apple: "/logo192.png",
	},
	manifest: "/manifest.json",
};

const geistSans = Geist({
	subsets: ["latin"],
});

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	viewportFit: "cover",
	colorScheme: "dark light",
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#064e3b" },
		{ media: "(prefers-color-scheme: dark)", color: "#064e3b" },
	],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html className={geistSans.className} lang="en">
			<body className={styles.body}>
				<Providers>{children}</Providers>
				<Toaster closeButton richColors theme="system" />
			</body>
		</html>
	);
}
