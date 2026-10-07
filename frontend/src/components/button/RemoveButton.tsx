import { IoRemoveCircleOutline } from "react-icons/io5";
import styles from "./RemoveButton.module.css";

interface Props {
	onClick: () => void;
}

export default function RemoveButton({ onClick }: Props) {
	return (
		<button type="button" onClick={onClick} className={styles.button}>
			<IoRemoveCircleOutline size={24} className={styles.icon} />
		</button>
	);
}
