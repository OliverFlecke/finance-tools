import { Input } from '@oliverflecke/components-react';
import React, { useCallback, useContext } from 'react';
import { TaxCalculatorContext } from './state';

const TaxCalculatorInput: React.FC = () => {
	const { dispatch } = useContext(TaxCalculatorContext);

	const onSalaryChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const salary = Number.parseFloat(e.currentTarget.value);
			if (salary) {
				dispatch({ type: 'SET SALARY', salary });
			}
		},
		[dispatch]
	);

	return (
		<div className="p-4">
			<Input
				placeholder="100,000"
				label="Income"
				className="bg-red-700"
				inputMode="numeric"
				onChange={onSalaryChange}
			/>
		</div>
	);
};

export default TaxCalculatorInput;
