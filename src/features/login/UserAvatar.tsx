import React from 'react';
import Image from 'next/image';

interface UserAvatarProps {
	pictureUrl?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ pictureUrl }) => (
	<Image
		src={pictureUrl ?? ''}
		width={40}
		height={40}
		alt="Avatar of the logged in user"
		className="max-h-10 rounded-full"
		loading="lazy"
	/>
);

export default UserAvatar;
