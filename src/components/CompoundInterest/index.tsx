import { Button, Input } from '@oliverflecke/components-react';
import React, { FC, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import NumberFormat from 'react-number-format';

interface CompoundInterestProps {
	name?: string;
}

type InterestAccrual = 'Yearly' | 'Monthly';
type FormDate = {
	existingAmount: number;
	interestRate: number;
	investmentPeriod: number;
	interestAccural: InterestAccrual;
	monthlyDeposit: number;
};

const CompoundInterest: FC<CompoundInterestProps> = ({}: CompoundInterestProps) => {
	const [showCalculation, setShowCalculation] = useState(false);
	const { register, handleSubmit, getValues } = useForm<FormDate>({
		defaultValues: {
			existingAmount: 100_000,
			interestRate: 0.07,
			investmentPeriod: 10,
			interestAccural: 'Yearly',
			monthlyDeposit: 10_000,
		},
	});
	const onSubmit = handleSubmit(() => setShowCalculation(true));

	return (
		<>
			<form
				onSubmit={onSubmit}
				className="w-full flex flex-col items-center justify-center"
			>
				<fieldset className="flex flex-col items-center space-y-6 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6">
					<NumberFormat
						customInput={Input}
						thousandSeparator={true}
						label="Existing amount"
						placeholder="20.000"
						inputMode="numeric"
						{...register('existingAmount')}
					/>
					<Input
						label="Expected yearly growth"
						placeholder="7"
						{...register('interestRate')}
					/>
					<Input
						label="Investment period"
						placeholder="10"
						{...register('investmentPeriod')}
					/>
					<Input
						label="Interval of interest accrual"
						placeholder="Yearly"
						{...register('interestAccural')}
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
			{showCalculation && <CalculationSummary {...getValues()} />}
		</>
	);
};

export default CompoundInterest;

const formatter = Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'DKK',
});

const CalculationSummary = (props: FormDate) => {
	const amount = calculateCompoundInterest(
		props.existingAmount,
		props.interestRate,
		props.investmentPeriod,
		props.interestAccural
	);

	return (
		<div>
			<AmountSummary
				amount={amount}
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

function calculateCompoundInterest(
	principal: number,
	interestRate: number,
	time: number,
	interestAccrual: InterestAccrual
): number {
	const n = getInterestAccrualPerYear(interestAccrual);
	return principal * Math.pow(1 + interestRate / n, n * time);
}

function getInterestAccrualPerYear(interestAccrual: InterestAccrual): number {
	switch (interestAccrual) {
		case 'Monthly':
			return 12;

		case 'Yearly':
		default:
			return 1;
	}
}
