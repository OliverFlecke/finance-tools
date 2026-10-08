import clsx from "clsx";
import type React from "react";
import { useRef } from "react";
import { useDrag, useDrop, type XYCoord } from "react-dnd";
import styles from "./SortableDragAndDropItem.module.css";

interface DragItem {
	index: number;
	id: string;
	type: string;
}

interface SortableDragAndDropItemProps {
	id: string;
	type: string;
	index: number;
	move: (dragIndex: number, hoverIndex: number) => void;
	children: React.ReactNode;
	className?: string;
}

export default function SortableDragAndDropItem({
	id,
	type,
	index,
	move,
	children,
	className,
}: SortableDragAndDropItemProps) {
	const ref = useRef<HTMLLIElement>(null);

	// biome-ignore lint/suspicious/noExplicitAny: unknown type
	const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: any | null }>(
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
				const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

				// Determine mouse position
				const clientOffset = monitor.getClientOffset();

				// Get pixels to the top
				const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

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
			collect: (monitor) => ({
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
			className={clsx(styles.item, isDragging && styles.dragging, className)}
		>
			{children}
		</li>
	);
}
