import React from 'react';
import { User } from 'utils/githubAuth';
import Image from 'next/image';

interface UserAvatarProps {
	user: User;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => (
	<Image
		src={`${user.avatar_url}&s=80`}
		alt="Avatar of the logged in user"
		className="max-h-10 rounded-full"
		loading="lazy"
	/>
);

export default UserAvatar;
