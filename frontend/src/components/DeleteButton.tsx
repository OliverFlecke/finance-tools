import { IoTrashOutline } from "react-icons/io5";
import styles from "./DeleteButton.module.css";

interface Props {
	onClick: () => void;
}

export default function DeleteButton({ onClick }: Props) {
	return (
		<button type="button" onClick={onClick} className={styles.button}>
			<IoTrashOutline size={24} className={styles.icon} />
		</button>
	);
}
