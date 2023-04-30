import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IoCloseOutline, IoMenuOutline } from 'react-icons/io5';

const links = [
	{ path: '/accounts', text: 'Accounts' },
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
	const [path, setPath] = useState('');

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setPath(window.location.pathname);
		}
	}, []);

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
					<h1 className="pl-4 pr-3 font-sans text-xl font-extralight uppercase md:px-0">
						Finance tracker
					</h1>
				</Link>
				<span className="text-md hidden font-sans font-extralight uppercase sm:inline md:hidden">
					<span className="text-lg">/</span>
					<span className="px-2">{links.find(x => x.path === path)?.text}</span>
				</span>
			</div>

			<ul
				className={`${
					isOpen ? 'flex' : 'hidden'
				} flex-col font-extralight md:flex md:flex-row md:items-center md:space-x-6 md:pl-8`}
			>
				{links.map(x => (
					<li key={x.path}>
						<a
							href={x.path}
							className={`h-full align-middle font-light hover:underline ${
								x.path === path ? 'underline' : ''
							}`}
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
