import { Button, Input } from '@oliverflecke/components-react';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

interface CompoundInterestProps {
	name?: string;
}

type FormDate = {
	existingAmount: number;
	yearlyGrowth: number;
	investmentPeriod: number;
	intervalOfInterestAccrual: 'Yearly' | 'Monthly';
	monthlyDeposit: number;
};

type CompoundCalculation = {
	totalAtEndOfPeriod: number;
};

const CompoundInterest: FC<CompoundInterestProps> = ({}: CompoundInterestProps) => {
	const [calculation, setCalculation] = useState<CompoundCalculation | null>(
		null
	);
	const { register, handleSubmit, getValues } = useForm<FormDate>({
		defaultValues: {
			existingAmount: 100_000,
			yearlyGrowth: 0.07,
			investmentPeriod: 10,
			intervalOfInterestAccrual: 'Yearly',
			monthlyDeposit: 10_000,
		},
	});
	const onSubmit = handleSubmit((data) => {
		const p = data.existingAmount;
		const r = data.yearlyGrowth;
		const t = data.investmentPeriod;
		const n = 1;
		const amount = p * (1 + r / n) ** (n * t);
		setCalculation({
			totalAtEndOfPeriod: amount,
		});
	});

	return (
		<>
			<form
				onSubmit={onSubmit}
				className="w-full flex flex-col items-center justify-center"
			>
				<fieldset className="flex flex-col items-center space-y-6 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6">
					<Input
						label="Existing amount"
						placeholder="20.000"
						{...register('existingAmount')}
					/>
					<Input
						label="Expected yearly growth"
						placeholder="7"
						{...register('yearlyGrowth')}
					/>
					<Input
						label="Investment period"
						placeholder="10"
						{...register('investmentPeriod')}
					/>
					<Input
						label="Interval of interest accrual"
						placeholder="Yearly"
						{...register('intervalOfInterestAccrual')}
					/>
					<Input
						label="Monthly deposit"
						placeholder="10.000"
						{...register('monthlyDeposit')}
					/>
				</fieldset>
				<div className="w-full pt-4 flex justify-center">
					<Button type="submit">Calculate</Button>
				</div>
			</form>
			{!!calculation && (
				<CalculationSummary {...calculation} {...getValues()} />
			)}
		</>
	);
};

export default CompoundInterest;

const formatter = Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'DKK',
});

const CalculationSummary = (props: CompoundCalculation & FormDate) => {
	return (
		<div>
			<AmountSummary
				amount={props.totalAtEndOfPeriod}
				label={`Total amount after ${props.investmentPeriod} years`}
				color="bg-blue-900 dark:bg-blue-300"
			/>
		</div>
	);
};

type AmountSummaryProps = {
	amount: number;
	label: string;
	color?: string;
};
const AmountSummary: FC<AmountSummaryProps> = ({
	amount,
	label,
	color,
}: AmountSummaryProps) => (
	<div className="flex space-x-4">
		<div className={`w-6 h-6 rounded-full ${color}`}></div>
		<div>
			<span className="text-black dark:text-warmGray-300">{label}</span>
			<div className="text-black dark:text-white">
				{formatter.format(amount)}
			</div>
		</div>
	</div>
);
