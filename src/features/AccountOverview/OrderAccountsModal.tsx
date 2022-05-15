import type { Identifier } from 'dnd-core';
import update from 'immutability-helper';
import React, { FC, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { DndProvider, useDrag, useDrop, XYCoord } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AccountContext } from './AccountService';
import { Account } from './models/Account';

const AccountCard: FC<{ account: Account }> = ({ account }) => {
	return <div>{account.name}</div>;
};

const OrderAccountsModal: FC = () => {
	const {
		state: { accounts },
	} = useContext(AccountContext);

	const [items, setItems] = useState(useMemo(() => accounts, [accounts]));
	const renderCard = useCallback((account: Account) => <AccountCard account={account} />, []);

	return (
		<SortableDragAndDropList items={items} setItems={setItems}>
			{renderCard}
		</SortableDragAndDropList>
	);
};

export default OrderAccountsModal;

interface SortableDragAndDropListProps<T> {
	items: T[];
	setItems: React.Dispatch<React.SetStateAction<T[]>>;
	children: (item: T) => React.ReactNode;
}

function SortableDragAndDropList<T extends { id: string }>({
	items,
	setItems,
	children,
}: SortableDragAndDropListProps<T>) {
	const updateItems = useCallback(
		(dragIndex: number, hoverIndex: number) => {
			setItems(prevItems =>
				update(prevItems, {
					$splice: [
						[dragIndex, 1],
						[hoverIndex, 0, prevItems[dragIndex]],
					],
				})
			);
		},
		[setItems]
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
						type={'ACCOUNT'}
					>
						{children(item)}
					</SortableDragAndDropItem>
				))}
			</ol>
		</DndProvider>
	);
}

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
}> = ({ id, type, index, move, children }) => {
	const ref = useRef<HTMLLIElement>(null);

	const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>(
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
		[index]
	);

	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: type,
			item: () => ({ id, index }),
			collect: monitor => ({
				isDragging: !!monitor.isDragging(),
			}),
		}),
		[index]
	);

	drag(drop(ref));
	return (
		<li
			ref={ref}
			data-handler-id={handlerId}
			className={`m-4 cursor-move rounded bg-green-500 p-2 ${isDragging ? 'opacity-25' : ''}`}
		>
			{children}
		</li>
	);
};
