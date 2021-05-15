import { Button, Input } from '@oliverflecke/components-react';
import React, { FC, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import { FV, InterestAccrual } from '../../services/formulas';

interface CompoundInterestProps {
	name?: string;
}

type FormData = {
	existingAmount: number;
	interestRate: number;
	investmentPeriod: number;
	interestAccural: InterestAccrual;
	monthlyDeposit: number;
};

const CompoundInterest: FC<CompoundInterestProps> = ({}: CompoundInterestProps) => {
	const [data, setData] = useState<FormData | null>(null);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({});
	const onSubmit = handleSubmit((d) => setData(d));

	return (
		<>
			<form onSubmit={onSubmit} className="w-full flex flex-col items-center justify-center">
				<fieldset className="flex flex-col items-center space-y-6 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6">
					<NumberFormat
						customInput={Input}
						thousandSeparator={true}
						label="Existing amount"
						placeholder="20,000"
						inputMode="numeric"
						errorMessage={errors.existingAmount?.message}
						{...register('existingAmount', { required: true })}
					/>
					<Input
						label="Expected yearly growth"
						placeholder="7"
						errorMessage={errors.interestRate && 'Please provide a valid value'}
						{...register('interestRate', {
							required: true,
						})}
					/>
					<Input
						label="Investment period"
						placeholder="10"
						errorMessage={
							errors.investmentPeriod && 'Please provide a number of years you are investing'
						}
						{...register('investmentPeriod', { required: true })}
					/>
					<Input
						label="Interval of interest accrual"
						placeholder="Yearly"
						errorMessage={errors.interestAccural?.message}
						{...register('interestAccural', { required: true })}
					/>
					<NumberFormat
						customInput={Input}
						thousandSeparator={true}
						label="Monthly deposit"
						placeholder="10,000"
						inputMode="numeric"
						errorMessage={errors.monthlyDeposit?.message}
						{...register('monthlyDeposit', { required: true })}
					/>
				</fieldset>
				<div className="w-full pt-4 flex justify-center">
					<Button type="submit">Calculate</Button>
				</div>
			</form>
			{data && (
				<CalculationSummary
					existingAmount={parse(data.existingAmount)}
					interestRate={parse(data.interestRate)}
					investmentPeriod={parse(data.investmentPeriod)}
					monthlyDeposit={parse(data.monthlyDeposit)}
					interestAccural={data.interestAccural}
				/>
			)}
		</>
	);
};

export default CompoundInterest;

const formatter = Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'DKK',
});

const CalculationSummary = (props: FormData) => {
	const r = useMemo(() => props.interestRate / 100, [props.interestRate]);
	const isWithDeposits = useMemo(() => props.monthlyDeposit !== 0, [props.monthlyDeposit]);

	const balance = FV(props.existingAmount, props.monthlyDeposit, r, props.investmentPeriod);
	const totalDeposits = 12 * props.monthlyDeposit * props.investmentPeriod + props.existingAmount;
	const totalInterest = balance - totalDeposits;

	return (
		<>
			<div className="w-full flex flex-col items-center">
				<div className="max-w-2xl w-full grid grid-cols-1 gap-y-4 gap-x-8 md:grid-cols-2 justify-center p-8">
					<AmountSummary
						amount={balance}
						label={`Balance after ${props.investmentPeriod} years`}
						color="bg-blue-900 dark:bg-blue-300"
					/>
					<AmountSummary
						amount={props.existingAmount}
						label={`Initial amount`}
						color="bg-green-900 dark:bg-green-300"
					/>
					<AmountSummary
						amount={totalDeposits}
						label={`Total deposits`}
						color="bg-indigo-900 dark:bg-indigo-300"
					/>
					<AmountSummary
						amount={totalInterest}
						label={'Gain from interest'}
						color="bg-yellow-900 dark:bg-yellow-300"
					/>
				</div>
			</div>
			<div className="overflow-x-scroll -mx-4 lg:overflow-x-auto lg:w-full lg:m-0">
				<table className="w-full">
					<thead>
						<tr className="text-right">
							<th className="text-center">Year</th>
							{isWithDeposits && <th>Deposit</th>}
							<th className="text-green-800 dark:text-green-400">Interest</th>
							{isWithDeposits && <th>Total deposits</th>}
							<th className="text-purple-800 dark:text-purple-400">Total interest</th>
							<th className="text-red-800 dark:text-red-400">Balance</th>
						</tr>
					</thead>
					<tbody className="text-right font-mono">
						{[...Array(props.investmentPeriod + 1).keys()].map((year) => {
							const deposit = year === 0 ? props.existingAmount : 12 * props.monthlyDeposit;
							const totalDeposit = year * 12 * props.monthlyDeposit + props.existingAmount;
							const totalBalance = FV(props.existingAmount, props.monthlyDeposit, r, year);
							const lastYear = year - 1;

							const depositPrevious = lastYear * 12 * props.monthlyDeposit + props.existingAmount;
							const balancePrevious = FV(props.existingAmount, props.monthlyDeposit, r, lastYear);

							const totalInterest = totalBalance - totalDeposit;
							const interest = year === 0 ? 0 : totalInterest - (balancePrevious - depositPrevious);

							return (
								<tr key={year} className="odd:bg-warmGray-200 dark:odd:bg-warmGray-900">
									<td className="text-center">{year}</td>
									{isWithDeposits && <td>{formatter.format(deposit)}</td>}
									<td>{formatter.format(interest)}</td>
									{isWithDeposits && <td>{formatter.format(totalDeposit)}</td>}
									<td>{formatter.format(totalInterest)}</td>
									<td>{formatter.format(totalBalance)}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
};

type AmountSummaryProps = {
	amount: number;
	label: string;
	color?: string;
};
const AmountSummary: FC<AmountSummaryProps> = ({ amount, label, color }: AmountSummaryProps) => (
	<div className="flex space-x-4">
		<div className={`w-6 h-6 rounded-full ${color}`}></div>
		<div>
			<span className="text-black dark:text-warmGray-300">{label}</span>
			<div className="text-black dark:text-white text-2xl">{formatter.format(amount)}</div>
		</div>
	</div>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parse(value: any): number {
	return Number.parseFloat(value.toString().replace(/,/g, ''));
}
