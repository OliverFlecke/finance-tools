import React, { useCallback, useContext } from 'react';
import { AccountContext } from '../services/AccountService';

const FileOptionMenu: React.FC = () => {
	const { dispatch, state } = useContext(AccountContext);

	const save = useCallback(() => {
		const blob = new Blob([JSON.stringify(state)], {
			type: 'application/json;charset=utf-8',
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
				dispatch({ type: 'load state', state });
			} catch {
				console.warn(`Unable to parse file ${file.name}`);
			}
		},
		[dispatch]
	);
	const closeFile = useCallback(() => dispatch({ type: 'reset' }), [dispatch]);

	return (
		<div className="space-x-4">
			<button className="btn btn-primary" onClick={save}>
				Save
			</button>
			<input type="file" onChange={fileChange} className="bg-blue-400 p-2 rounded" />
			<button className="btn btn-secondary" onClick={closeFile}>
				Close
			</button>
		</div>
	);
};
export default FileOptionMenu;
