import React, { useState } from 'react';
import { IoCloseOutline, IoMenuOutline } from 'react-icons/io5';
import Link from 'next/link';

const links = [
	{ path: '/', text: 'Overview' },
	{
		path: '/stocks',
		text: 'Stocks',
	},
	{ path: '/interest', text: 'Interest' },
	{ path: '/tax', text: 'Tax calculator' },
	{ path: '/budget', text: 'Budget' },
];

const Navigation: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className="flex flex-col justify-center md:flex-row">
			<div className="flex items-center">
				<button
					className="md:hidden"
					title="Menu"
					onClick={() => setIsOpen(x => !x)}
				>
					{isOpen ? <IoCloseOutline size={32} /> : <IoMenuOutline size={32} />}
				</button>
				<Link href="/">
					<h1 className="px-4 font-sans text-xl font-light uppercase md:px-0">
						Finance tracker
					</h1>
				</Link>
			</div>

			<ul
				className={`${
					isOpen ? 'flex' : 'hidden'
				} flex-col md:flex md:flex-row md:items-center md:space-x-6 md:pl-8`}
			>
				{links.map(x => (
					<li key={x.path}>
						<a
							href={x.path}
							className="h-full align-middle font-light hover:underline"
						>
							{x.text}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Navigation;
