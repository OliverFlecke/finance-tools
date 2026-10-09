import { move } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import type { ComponentType, Dispatch, PropsWithChildren, SetStateAction } from "react";
import styles from "./index.module.css";

interface Props<T> {
	items: T[];
	setItems: Dispatch<SetStateAction<T[]>>;
	component: ComponentType<T>;
}

export default function List<T extends { id: string }>({
	items,
	setItems,
	component: Component,
}: Readonly<Props<T>>) {
	return (
		<DragDropProvider onDragEnd={(e) => setItems((xs) => move(xs, e))}>
			<ol className={styles.list}>
				{items.map((x, i) => (
					<Item id={x.id} index={i} key={x.id}>
						<Component {...x} />
					</Item>
				))}
			</ol>
		</DragDropProvider>
	);
}

function Item({ id, index, children }: PropsWithChildren<{ id: string; index: number }>) {
	const { ref } = useSortable({ id, index });

	return <li ref={ref}>{children}</li>;
}
