import { useOnOutsideMouseDown } from "@oliverflecke/components-react";
import type { User } from "oidc-client-ts";
import { useRef, useState } from "react";
import { useAuth } from "react-oidc-context";
import LoginButton from "./LoginButton";
import LoginMenu from "./LoginMenu";
import UserAvatar from "./UserAvatar";

export default function LoginState() {
	const { user } = useAuth();

	return user ? <LoginDropDownMenu user={user} /> : <LoginButton />;
}

interface LoginDropDownMenuProps {
	user: User;
}

function LoginDropDownMenu({ user }: Readonly<LoginDropDownMenuProps>) {
	const [isOpen, setIsOpen] = useState(false);

	const ref = useRef<HTMLDivElement>(null as never);
	useOnOutsideMouseDown(ref, () => setIsOpen(false));

	return (
		<div ref={ref} className="relative flex items-center space-x-4">
			<div className="group">
				<button type="button" onClick={() => setIsOpen((x) => !x)}>
					<UserAvatar pictureUrl={user.profile.picture} />
				</button>
			</div>
			<LoginMenu isOpen={isOpen} />
		</div>
	);
}
