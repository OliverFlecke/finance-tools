import clsx from "clsx";
import Link from "next/link";
import type React from "react";
import { useEffect, useState } from "react";
import { IoCloseOutline, IoMenuOutline } from "react-icons/io5";
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

const Navigation: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [path, setPath] = useState("");

	useEffect(() => {
		if (typeof window !== "undefined") {
			setPath(window.location.pathname);
		}
	}, []);

	return (
		<nav className={styles.nav}>
			<div className={styles.top_row}>
				<button
					type="button"
					className={styles.menu_button}
					title="Menu"
					onClick={() => setIsOpen((x) => !x)}
				>
					{isOpen ? <IoCloseOutline size={32} /> : <IoMenuOutline size={32} />}
				</button>
				<Link href="/">
					<h1 className={styles.title}>Finance tracker</h1>
				</Link>
				<span className={styles.current_page}>
					<span className={styles.current_page_slash}>/</span>
					<span className={styles.current_page_text}>
						{links.find((x) => x.path === path)?.text}
					</span>
				</span>
			</div>

			<ul className={clsx(styles.links, isOpen && styles.open)}>
				{links.map((x) => (
					<li key={x.path}>
						<a href={x.path} className={clsx(styles.link, x.path === path && styles.link_active)}>
							{x.text}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Navigation;
