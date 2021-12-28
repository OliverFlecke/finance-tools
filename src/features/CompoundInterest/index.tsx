import { Button, Input, Select, SelectOption } from '@oliverflecke/components-react';
import React, { FC, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FV, InterestAccrual } from '../../services/formulas';
import { parseNumber } from '../../utils/converters';

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
	const onSubmit = handleSubmit((d) => {
		console.debug(d);
		setData(d);
	});

	return (
		<div className="pb-4 dark:bg-gray-800">
			<h2 className="text-xl px-4 py-4 lg:text-left">Compound interest calculator</h2>
			<form onSubmit={onSubmit} className="w-full px-4 overflow-x-hidden flex-col-center">
				<fieldset className="flex flex-col items-start space-y-6 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6">
					<Input
						// customInput={Input}
						// thousandSeparator={true}
						label="Existing amount"
						placeholder="20,000"
						inputMode="numeric"
						errorMessage={errors.existingAmount?.message}
						{...register('existingAmount', { required: 'Please provide your existing amount' })}
					/>
					<Input
						label="Expected yearly growth"
						placeholder="7"
						errorMessage={errors.interestRate?.message}
						{...register('interestRate', {
							required: 'Please provide a valid value',
						})}
					/>
					<Input
						label="Investment period"
						placeholder="10"
						errorMessage={errors.investmentPeriod?.message}
						{...register('investmentPeriod', {
							required: 'Please provide a number of years you are investing',
						})}
					/>
					<Select
						label="Interval of interest accural"
						{...register('interestAccural', { required: true })}
					>
						<SelectOption value="Yearly">Yearly</SelectOption>
						<SelectOption value="Monthly">Monthly</SelectOption>
					</Select>
					<Input
						// customInput={Input}
						// thousandSeparator={true}
						label="Monthly deposit"
						placeholder="10,000"
						inputMode="numeric"
						errorMessage={errors.monthlyDeposit?.message}
						{...register('monthlyDeposit', {
							required: 'Please provide how much you will deposit each month',
						})}
					/>
				</fieldset>
				<div className="w-full pt-4 flex justify-center">
					<Button type="submit">Calculate</Button>
				</div>
			</form>
			{data && (
				<CalculationSummary
					existingAmount={parseNumber(data.existingAmount)}
					interestRate={parseNumber(data.interestRate)}
					investmentPeriod={parseNumber(data.investmentPeriod)}
					monthlyDeposit={parseNumber(data.monthlyDeposit)}
					interestAccural={data.interestAccural}
				/>
			)}
		</div>
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
							<th className="px-4 text-center">Year</th>
							{isWithDeposits && <th className="px-4">Deposit</th>}
							<th className="px-4 text-green-800 dark:text-green-400">Interest</th>
							{isWithDeposits && <th className="px-4">Total deposits</th>}
							<th className="px-4 text-purple-800 dark:text-purple-400">Total interest</th>
							<th className="px-4 text-red-800 dark:text-red-400">Balance</th>
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
								<tr key={year} className="odd:bg-gray-200 dark:odd:bg-gray-900">
									<td className="text-center px-4">{year}</td>
									{isWithDeposits && <td className="px-4">{formatter.format(deposit)}</td>}
									<td className="px-4">{formatter.format(interest)}</td>
									{isWithDeposits && <td className="px-4">{formatter.format(totalDeposit)}</td>}
									<td className="px-4">{formatter.format(totalInterest)}</td>
									<td className="px-4">{formatter.format(totalBalance)}</td>
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
			<span className="text-black dark:text-gray-300">{label}</span>
			<div className="text-black dark:text-white text-2xl">{formatter.format(amount)}</div>
		</div>
	</div>
);
