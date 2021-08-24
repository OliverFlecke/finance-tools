import React from 'react';
import { useState } from 'react';
import { IoMenuOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav>
			<div className="flex items-center">
				<button onClick={() => setIsOpen((x) => !x)}>
					<IoMenuOutline size={32} />
				</button>
				<Link to="/">
					<h1 className="px-4 text-xl uppercase font-sans font-light">Finance tracker</h1>
				</Link>
			</div>

			<ul className={`${isOpen ? 'flex' : 'hidden'} flex-col`}>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/stocks">Stocks</Link>
				</li>
				<li>
					<Link to="/compound-calculator">Compound calculator</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
