import Image from "next/image";
import type React from "react";
import styles from "./UserAvatar.module.css";

interface UserAvatarProps {
	pictureUrl?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ pictureUrl }) => (
	<Image
		src={pictureUrl ?? ""}
		width={40}
		height={40}
		alt="Avatar of the logged in user"
		className={styles.avatar}
		loading="lazy"
	/>
);

export default UserAvatar;
