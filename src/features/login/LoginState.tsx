import React from 'react';
import { User } from 'utils/githubAuth';

interface LoginStateProps {
	user: User | null;
	authorizeUrl: string;
	logout?: () => void;
}

const LoginState: React.FC<LoginStateProps> = ({ user, authorizeUrl, logout }: LoginStateProps) => {
	if (user === null) {
		return (
			<a className="btn btn-primary" href={authorizeUrl}>
				Login
			</a>
		);
	}

	return (
		<div className="flex items-center space-x-4">
			<span className="hidden sm:inline">{user.login}</span>
			<div className="group">
				<img
					src={user.avatar_url}
					alt="Avatar of the logged in user"
					className="max-h-12 rounded-full"
					loading="lazy"
				/>
				<div className="hidden group-hover:block absolute rounded py-4 shadow bg-warmGray-100 dark:bg-warmGray-700">
					<button
						onClick={logout}
						className="btn hover:text-warmGray-900 dark:hover:text-warmGray-400 hover:underline"
					>
						Logout
					</button>
				</div>
			</div>
		</div>
	);
};

export default LoginState;
