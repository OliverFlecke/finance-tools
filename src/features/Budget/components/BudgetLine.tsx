import React from 'react';
import { Category } from '../category';
import Line from './Line';

const BudgetLine: React.FC<{ category: Category }> = ({ category }) => {
	if (category.isLeaf) {
		return <Line category={category} />;
	}

	return (
		<details open={category.isOpen}>
			<summary className="w-full cursor-pointer">
				<Line category={category} />
			</summary>
			<ul className="pl-4">
				{category.children.map(child => (
					<BudgetLine key={child.name} category={child} />
				))}
			</ul>
		</details>
	);
};

export default BudgetLine;
