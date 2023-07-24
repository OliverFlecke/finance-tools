import { saveAs } from 'file-saver';
import React, { useCallback, useContext } from 'react';
import { IoSaveOutline } from 'react-icons/io5';
import { AccountContext } from './AccountService';

const FileOptionMenu: React.FC = () => {
	const { dispatch, state } = useContext(AccountContext);

	const closeFile = useCallback(() => dispatch({ type: 'RESET' }), [dispatch]);
	const save = useCallback(() => {
		const blob = new Blob([JSON.stringify(state)], {
			type: 'text/plain;charset=utf-8',
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
				dispatch({ type: 'LOAD STATE', state });
			} catch {
				console.warn(`Unable to parse file ${file.name}`);
			}
		},
		[dispatch],
	);

	return (
		<div className="flex justify-end space-x-4">
			<button className="btn btn-primary space-x-2" onClick={save}>
				<IoSaveOutline className="inline" />
				<span className="align-middle">Save</span>
			</button>
			<input
				type="file"
				onChange={fileChange}
				className="rounded bg-blue-400 p-2"
			/>
			<button className="btn btn-secondary" onClick={closeFile}>
				Close
			</button>
		</div>
	);
};
export default FileOptionMenu;
