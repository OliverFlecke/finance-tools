import update from "immutability-helper";
import type React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SortableDragAndDropItem from "./SortableDragAndDropItem";

interface SortableDragAndDropListProps<T> {
	items: T[];
	setItems: React.Dispatch<React.SetStateAction<T[]>>;
	children: (item: T) => React.ReactNode;
	typeIdentifier: string;
	className?: string;
}

export default function SortableDragAndDropList<T extends { id: string }>({
	typeIdentifier,
	items,
	setItems,
	children,
	className,
}: SortableDragAndDropListProps<T>) {
	const updateItems = (dragIndex: number, hoverIndex: number) => {
		setItems((prevItems) =>
			update(prevItems, {
				$splice: [
					[dragIndex, 1],
					[hoverIndex, 0, prevItems[dragIndex]],
				],
			}),
		);
	};

	return (
		<DndProvider backend={HTML5Backend}>
			<ol>
				{items.map((item, index) => (
					<SortableDragAndDropItem
						className={className}
						id={item.id}
						index={index}
						key={item.id}
						move={updateItems}
						type={typeIdentifier}
					>
						{children(item)}
					</SortableDragAndDropItem>
				))}
			</ol>
		</DndProvider>
	);
}
