import React from 'react';

const TextPage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<div className="flex justify-center">
		<div className="text-page flex max-w-prose flex-col items-center justify-center py-4 px-2 md:px-4">
			{children}
		</div>
	</div>
);

export default TextPage;
