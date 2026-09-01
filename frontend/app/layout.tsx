import "compiled.css";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import type React from "react";
import Providers from "./providers";

export const metadata: Metadata = {
	title: { default: "Finance", template: "%s | Finance" },
	description: "Finance tracker",
	icons: {
		icon: "/favicon.ico",
		apple: "/logo192.png",
	},
	manifest: "/manifest.json",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	colorScheme: "dark light",
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#064e3b" },
		{ media: "(prefers-color-scheme: dark)", color: "#064e3b" },
	],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="min-h-screen">
				{/* <Script */}
				{/* 	async */}
				{/* 	defer */}
				{/* 	data-api="https://plausible.oliverflecke.me/api/event" */}
				{/* 	data-domain="finance.oliverflecke.me" */}
				{/* 	src="https://plausible.oliverflecke.me/js/script.js" */}
				{/* /> */}
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
