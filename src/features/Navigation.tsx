import React, { useState } from 'react';
import { IoCloseOutline, IoMenuOutline } from 'react-icons/io5';

const links = [
	{ path: '/', text: 'Overview' },
	{
		path: '/stocks',
		text: 'Stocks',
	},
	{ path: '/interest', text: 'Compound calculator' },
];

const Navigation: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className="flex flex-col md:flex-row">
			<div className="flex items-center">
				<button className="md:hidden" onClick={() => setIsOpen((x) => !x)}>
					{isOpen ? <IoCloseOutline size={32} /> : <IoMenuOutline size={32} />}
				</button>
				<a href="/">
					<h1 className="px-4 md:px-0 text-xl uppercase font-sans font-light">Finance tracker</h1>
				</a>
			</div>

			<ul
				className={`${
					isOpen ? 'flex' : 'hidden'
				} flex-col md:flex md:flex-row md:items-center md:space-x-4 md:pl-8`}
			>
				{links.map((x) => (
					<li key={x.path}>
						<a href={x.path} className="align-middle h-full font-light hover:underline">
							{x.text}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Navigation;
