import clsx from "clsx";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./Navigation.module.css";

const links = [
	{ path: "/accounts", text: "Accounts" },
	{
		path: "/stocks",
		text: "Stocks",
	},
	{ path: "/interest", text: "Interest" },
	{ path: "/tax", text: "Tax calculator" },
	{ path: "/budget", text: "Budget" },
];

export default function Navigation() {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = useClientsidePathname();

	return (
		<nav className={styles.nav}>
			<div className={styles.top_row}>
				<MenuButton isOpen={isOpen} setIsOpen={setIsOpen} />
				<Link href="/">
					<h1 className={styles.title}>Finance tracker</h1>
				</Link>
			</div>

			<ul className={clsx(styles.links, isOpen && styles.open)}>
				{links.map((x) => (
					<li key={x.path}>
						<a href={x.path} className={clsx(styles.link, x.path === pathname && styles.active)}>
							{x.text}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}

function useClientsidePathname(): string {
	const [path, setPath] = useState("");

	useEffect(() => {
		if (typeof window !== "undefined") {
			setPath(window.location.pathname);
		}
	}, []);

	return path;
}

function MenuButton({
	isOpen,
	setIsOpen,
}: Readonly<{ isOpen: boolean; setIsOpen: Dispatch<SetStateAction<boolean>> }>) {
	return (
		<button
			type="button"
			className={styles.menu_button}
			title="Menu"
			onClick={() => setIsOpen((x) => !x)}
		>
			{isOpen ? <X /> : <Menu />}
		</button>
	);
}
