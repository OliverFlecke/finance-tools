import { type User, useAuth0 } from "@auth0/auth0-react";
import { useOnOutsideMouseDown } from "@oliverflecke/components-react";
import { useRef, useState } from "react";
import LoginButton from "./LoginButton";
import LoginMenu from "./LoginMenu";
import UserAvatar from "./UserAvatar";

export default function LoginState() {
	const { user } = useAuth0();

	return user ? <LoginDropDownMenu user={user} /> : <LoginButton />;
}

interface LoginDropDownMenuProps {
	user: User;
}

function LoginDropDownMenu({ user }: Readonly<LoginDropDownMenuProps>) {
	const [isOpen, setIsOpen] = useState(false);

	const ref = useRef<HTMLDivElement>(null!);
	useOnOutsideMouseDown(ref, () => setIsOpen(false));

	return (
		<div ref={ref} className="relative flex items-center space-x-4">
			<div className="group">
				<button onClick={() => setIsOpen((x) => !x)}>
					<UserAvatar pictureUrl={user.picture} />
				</button>
			</div>
			<LoginMenu isOpen={isOpen} />
		</div>
	);
}
