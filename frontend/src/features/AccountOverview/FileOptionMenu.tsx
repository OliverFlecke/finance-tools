import { saveAs } from "file-saver";
import { Save } from "lucide-react";
import type React from "react";
import { useCallback, useContext } from "react";
import { Button } from "@/ui/Button/Button";
import { AccountContext } from "./AccountService";
import styles from "./FileOptionMenu.module.css";

const FileOptionMenu: React.FC = () => {
	const { dispatch, state } = useContext(AccountContext);

	const closeFile = useCallback(() => dispatch({ type: "RESET" }), [dispatch]);
	const save = useCallback(() => {
		const blob = new Blob([JSON.stringify(state)], {
			type: "text/plain;charset=utf-8",
		});
		const filename = `finance_${new Date().toISOString().slice(0, 19)}.json`;
		saveAs(blob, filename);
	}, [state]);

	const fileChange = useCallback(
		async (e: React.ChangeEvent<HTMLInputElement>) => {
			const files = e.target.files;
			if (!files || files.length === 0) return;

			const file = files[0];
			const text = await file.text();
			try {
				const state = JSON.parse(text);
				dispatch({ type: "LOAD STATE", state });
			} catch {
				console.warn(`Unable to parse file ${file.name}`);
			}
		},
		[dispatch],
	);

	return (
		<div className={styles.container}>
			<Button onClick={save}>
				<Save />
				Save
			</Button>

			<input type="file" onChange={fileChange} className={styles.file_input} />

			<Button onClick={closeFile} variant="Secondary">
				Close
			</Button>
		</div>
	);
};
export default FileOptionMenu;
