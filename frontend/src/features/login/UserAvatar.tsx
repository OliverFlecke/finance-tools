import Image from "next/image";
import styles from "./UserAvatar.module.css";

interface UserAvatarProps {
	pictureUrl?: string;
}

export default function UserAvatar({ pictureUrl }: UserAvatarProps) {
	return (
		<Image
			src={pictureUrl ?? ""}
			width={40}
			height={40}
			alt="Avatar of the logged in user"
			className={styles.avatar}
			loading="lazy"
		/>
	);
}
