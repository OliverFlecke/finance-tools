import React, { useEffect, useState } from 'react';

interface Props {
	children: unknown;
}

const ClientOnly: React.FC<Props> = ({ children }) => {
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	if (!hasMounted) {
		return null;
	}

	return <>{children}</>;
};
export default ClientOnly;
