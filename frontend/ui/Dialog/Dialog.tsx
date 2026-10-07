import { type ReactNode, useEffect, useRef } from "react";
import styles from "./Dialog.module.css";

export interface DialogProps {
	/** Controls whether the dialog is open. */
	open: boolean;
	/** Called when the dialog is dismissed, via the Escape key or a backdrop click. */
	onClose: () => void;
	/** Dialog content; fully unmounted while closed. */
	children: ReactNode;
}

/**
 * Modal dialog built on the native `<dialog>` element, for focus trapping, `::backdrop`,
 * and Escape-to-close for free.
 */
export function Dialog({ open, onClose, children }: DialogProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;
		if (open && !dialog.open) dialog.showModal();
		if (!open && dialog.open) dialog.close();
	}, [open]);

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: closes on backdrop click; Escape (native to <dialog>) already covers keyboard dismissal
		<dialog
			ref={dialogRef}
			className={styles.dialog}
			onClick={(e) => {
				if (e.target === dialogRef.current) onClose();
			}}
			onClose={onClose}
		>
			{open && children}
		</dialog>
	);
}
