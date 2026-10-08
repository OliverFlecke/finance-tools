import { X } from "lucide-react";
import {
	cloneElement,
	isValidElement,
	type ReactElement,
	type ReactNode,
	useEffect,
	useRef,
	useState,
} from "react";
import styles from "./Dialog.module.css";

export interface DialogProps {
	/** Controls whether the dialog is open. Ignored when `trigger` is set. */
	open?: boolean;
	/** Called when the dialog is dismissed, via the Escape key, a backdrop click, or the close button. */
	onClose?: () => void;
	/** Element that opens the dialog on click; when set, the dialog manages its own open state. */
	trigger?: ReactElement<{ onClick?: (e: MouseEvent) => void }>;
	title: string;
	/** Dialog content; fully unmounted while closed. */
	children: ReactNode;
}

/**
 * Modal dialog built on the native `<dialog>` element, for focus trapping, `::backdrop`,
 * and Escape-to-close for free.
 */
export function Dialog({
	open: openProp,
	title,
	onClose,
	trigger,
	children,
}: Readonly<DialogProps>) {
	const [internalOpen, setInternalOpen] = useState(false);
	const open = trigger ? internalOpen : Boolean(openProp);
	const dialogRef = useRef<HTMLDialogElement>(null);

	const close = () => {
		if (trigger) setInternalOpen(false);
		onClose?.();
	};

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;
		if (open && !dialog.open) dialog.showModal();
		if (!open && dialog.open) dialog.close();
	}, [open]);

	const triggerElement = isValidElement(trigger)
		? cloneElement(trigger, {
				onClick: (e: MouseEvent) => {
					trigger.props.onClick?.(e);
					setInternalOpen(true);
				},
			})
		: trigger;

	return (
		<>
			{trigger && triggerElement}
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: closes on backdrop click; Escape (native to <dialog>) already covers keyboard dismissal */}
			<dialog
				ref={dialogRef}
				className={styles.dialog}
				onClick={(e) => {
					if (e.target === dialogRef.current) close();
				}}
				onClose={close}
			>
				<div className={styles.header}>
					<h2>{title}</h2>
					<button type="button" onClick={close} aria-label="Close">
						<X />
					</button>
				</div>

				{children}
			</dialog>
		</>
	);
}
