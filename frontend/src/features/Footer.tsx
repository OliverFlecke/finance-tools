import Link from "next/link";
import styles from "./Footer.module.css";

const Footer = () => (
	<footer className={styles.footer}>
		<Link href="/privacy">Privacy and data</Link>
	</footer>
);

export default Footer;
