import React, { useState } from 'react';
import { IoCloseOutline, IoMenuOutline } from 'react-icons/io5';

const links = [
	{ path: '/', text: 'Overview' },
	{
		path: '/stocks',
		text: 'Stocks',
	},
	{ path: '/interest', text: 'Interest' },
	{ path: '/tax', text: 'Tax calculator' },
];

const Navigation: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className="flex flex-col justify-center md:flex-row">
			<div className="flex items-center">
				<button className="md:hidden" onClick={() => setIsOpen(x => !x)}>
					{isOpen ? <IoCloseOutline size={32} /> : <IoMenuOutline size={32} />}
				</button>
				<a href="/">
					<h1 className="px-4 font-sans text-xl font-light uppercase md:px-0">Finance tracker</h1>
				</a>
			</div>

			<ul
				className={`${
					isOpen ? 'flex' : 'hidden'
				} flex-col md:flex md:flex-row md:items-center md:space-x-4 md:pl-8`}
			>
				{links.map(x => (
					<li key={x.path}>
						<a href={x.path} className="h-full align-middle font-light hover:underline">
							{x.text}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Navigation;
