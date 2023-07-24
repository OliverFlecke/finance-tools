import type { Identifier } from 'dnd-core';
import React, { FC, useRef } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';

interface DragItem {
	index: number;
	id: string;
	type: string;
}

const SortableDragAndDropItem: FC<{
	id: string;
	type: string;
	index: number;
	move: (dragIndex: number, hoverIndex: number) => void;
	children: React.ReactNode;
	className?: string;
}> = ({ id, type, index, move, children, className }) => {
	const ref = useRef<HTMLLIElement>(null);

	const [{ handlerId }, drop] = useDrop<
		DragItem,
		void,
		{ handlerId: Identifier | null }
	>(
		{
			accept: type,
			collect(monitor) {
				return {
					handlerId: monitor.getHandlerId(),
				};
			},
			hover(item: DragItem, monitor) {
				if (!ref.current) {
					return;
				}
				const dragIndex = item.index;
				const hoverIndex = index;

				// Don't replace items with themselves
				if (dragIndex === hoverIndex) {
					return;
				}

				// Determine rectangle on screen
				const hoverBoundingRect = ref.current?.getBoundingClientRect();

				// Get vertical middle
				const hoverMiddleY =
					(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

				// Determine mouse position
				const clientOffset = monitor.getClientOffset();

				// Get pixels to the top
				const hoverClientY =
					(clientOffset as XYCoord).y - hoverBoundingRect.top;

				// Dragging downwards
				if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
					return;
				}

				// Dragging upwards
				if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
					return;
				}

				move(dragIndex, hoverIndex);

				item.index = hoverIndex;
			},
		},
		[index],
	);

	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: type,
			item: () => ({ id, index }),
			collect: monitor => ({
				isDragging: !!monitor.isDragging(),
			}),
		}),
		[index],
	);

	drag(drop(ref));
	return (
		<li
			ref={ref}
			data-handler-id={handlerId}
			className={`cursor-move ${isDragging ? 'opacity-25' : ''} ${
				!className ? '' : className
			}`}
		>
			{children}
		</li>
	);
};

export default SortableDragAndDropItem;
