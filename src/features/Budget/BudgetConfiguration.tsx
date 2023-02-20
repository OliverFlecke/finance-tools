import React from 'react';

const Configuration: React.FC<{
	setSavePercent: React.Dispatch<React.SetStateAction<number>>;
}> = ({ setSavePercent }) => {
	return (
		<div className="mx-4">
			<h3 className="pt-4 text-xl">Configuration</h3>
			<label htmlFor="desired-savings">Desired savings</label>
			<span className="mx-4 rounded bg-gray-800 py-1 px-2 focus-within:ring-2">
				<input
					className="w-12 bg-transparent pr-2 text-right outline-none"
					placeholder="15"
					name="desired-savings"
					type="number"
					min="0"
					max="100"
					onKeyDown={event => {
						if (
							!/[0-9\.,\b]/.test(event.key) &&
							event.key !== 'Backspace' &&
							event.key !== 'Delete'
						) {
							event.preventDefault();
							return;
						}
					}}
					onChange={x =>
						setSavePercent(Number.parseFloat(x.currentTarget.value))
					}
				/>
				%
			</span>
		</div>
	);
};

export default Configuration;
