import { IoAddCircleOutline } from "react-icons/io5";
import styles from "./AddButton.module.css";

interface Props {
	onClick: () => void;
}

export default function AddButton({ onClick }: Props) {
	return (
		<button type="button" onClick={onClick} className={styles.button}>
			<IoAddCircleOutline size={24} className={styles.icon} />
		</button>
	);
}
