import update from 'immutability-helper';
import React, { useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SortableDragAndDropItem from './SortableDragAndDropItem';

interface SortableDragAndDropListProps<T> {
	items: T[];
	setItems: React.Dispatch<React.SetStateAction<T[]>>;
	children: (item: T) => React.ReactNode;
	typeIdentifier: string;
	className?: string;
}

function SortableDragAndDropList<T extends { id: string }>({
	typeIdentifier,
	items,
	setItems,
	children,
	className,
}: SortableDragAndDropListProps<T>) {
	const updateItems = useCallback(
		(dragIndex: number, hoverIndex: number) => {
			setItems(prevItems =>
				update(prevItems, {
					$splice: [
						[dragIndex, 1],
						[hoverIndex, 0, prevItems[dragIndex]],
					],
				}),
			);
		},
		[setItems],
	);

	return (
		<DndProvider backend={HTML5Backend}>
			<ol>
				{items.map((item, index) => (
					<SortableDragAndDropItem
						key={item.id}
						id={item.id}
						index={index}
						move={updateItems}
						type={typeIdentifier}
						className={className}
					>
						{children(item)}
					</SortableDragAndDropItem>
				))}
			</ol>
		</DndProvider>
	);
}

export default SortableDragAndDropList;
