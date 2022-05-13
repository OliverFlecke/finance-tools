import type { Identifier } from 'dnd-core';
import React, { FC, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { DndProvider, useDrag, useDrop, XYCoord } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AccountContext } from './AccountService';
import { Account } from './models/Account';
import update from 'immutability-helper';

const OrderAccountsModal: FC = () => {
	const {
		state: { accounts },
	} = useContext(AccountContext);

	const [items, setItems] = useState(useMemo(() => accounts, [accounts]));

	const moveAccounts = useCallback((dragIndex: number, hoverIndex: number) => {
		console.debug(`moving: ${dragIndex} hover ${hoverIndex}`);
		setItems(prevItems =>
			update(prevItems, {
				$splice: [
					[dragIndex, 1],
					[hoverIndex, 0, prevItems[dragIndex]],
				],
			})
		);
	}, []);

	return (
		<DndProvider backend={HTML5Backend}>
			<ol>
				{items.map((account, index) => (
					<AccountCard key={account.id} index={index} account={account} move={moveAccounts} />
				))}
			</ol>
		</DndProvider>
	);
};

export default OrderAccountsModal;

interface DragItem {
	index: number;
	id: string;
	type: string;
}

const AccountCard: FC<{
	account: Account;
	index: number;
	move: (dragIndex: number, hoverIndex: number) => void;
}> = ({ account, index, move }) => {
	const ref = useRef<HTMLLIElement>(null);

	const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>(
		{
			accept: 'ACCOUNT',
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
			type: 'ACCOUNT',
			item: () => ({ id: account.id, index }),
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
			{account.name} - {index}
		</li>
	);
};
