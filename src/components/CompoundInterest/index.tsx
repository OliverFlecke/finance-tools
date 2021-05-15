import { Button, Input } from '@oliverflecke/components-react';
import React, { FC, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import NumberFormat from 'react-number-format';

interface CompoundInterestProps {
	name?: string;
}

type InterestAccrual = 'Yearly' | 'Monthly';
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
	} = useForm<FormData>({
		// defaultValues: {
		// 	existingAmount: 100_000,
		// 	interestRate: 0.07,
		// 	investmentPeriod: 10,
		// 	interestAccural: 'Yearly',
		// 	monthlyDeposit: 10_000,
		// },
	});
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
	const rate = useMemo(() => props.interestRate / 100, [props.interestRate]);
	const isWithDeposits = useMemo(() => props.monthlyDeposit !== 0, [props.monthlyDeposit]);
	const amount = compoundInterest(
		props.existingAmount,
		rate,
		props.investmentPeriod,
		props.interestAccural
	);

	const future = futureValue(
		props.monthlyDeposit,
		rate,
		props.investmentPeriod,
		props.interestAccural
	);

	// console.log(props);
	// console.log(`Amount: ${amount}`);
	// console.log(`Future: ${future}`);
	// console.log(`Sum:    ${amount + future}`);

	return (
		<>
			<div className="flex flex-wrap justify-center p-8 space-x-8">
				<AmountSummary
					amount={amount}
					label={`Total amount after ${props.investmentPeriod} years`}
					color="bg-blue-900 dark:bg-blue-300"
				/>
				<AmountSummary
					amount={props.existingAmount}
					label={`Initial amount`}
					color="bg-green-900 dark:bg-green-300"
				/>
				<AmountSummary
					amount={12 * props.monthlyDeposit * props.investmentPeriod}
					label={`Total monthly deposits`}
					color="bg-indigo-900 dark:bg-indigo-300"
				/>
			</div>
			<table className="w-full">
				<thead>
					<tr>
						<th>Year</th>
						{isWithDeposits && <th>Deposit</th>}
						<th className="text-green-800 dark:text-green-400">Interest</th>
						{isWithDeposits && <th>Total deposits</th>}
						<th className="text-purple-800 dark:text-purple-400">Total interest</th>
						<th className="text-red-800 dark:text-red-400">Balance</th>
					</tr>
				</thead>
				<tbody className="text-right font-mono">
					{[...Array(props.investmentPeriod + 1).keys()].map((year) => {
						const existingAmount = props.existingAmount + year * 12 * props.monthlyDeposit;
						const deposit = year === 0 ? props.existingAmount : 12 * props.monthlyDeposit;
						const totalDeposit = year * 12 * props.monthlyDeposit + props.existingAmount;

						const interestOnCurrentBalance =
							year <= 0
								? 0
								: compoundInterest(existingAmount, rate, year - 1, props.interestAccural) -
								  existingAmount;

						const totalInterestOnCurrentBalance =
							compoundInterest(props.existingAmount, rate, year, props.interestAccural) -
							props.existingAmount;
						const future =
							futureValue(props.monthlyDeposit, rate, year, 'Monthly', 'beginning') -
							year * 12 * props.monthlyDeposit;

						const interest = totalInterestOnCurrentBalance - interestOnCurrentBalance;
						const totalInterest = totalInterestOnCurrentBalance;
						const balance = existingAmount + totalInterest;

						return (
							<tr key={year} className="odd:bg-warmGray-900 py-2">
								<td className="text-center">{year}</td>
								{isWithDeposits && <td>{formatter.format(deposit)}</td>}
								<td>{formatter.format(interest)}</td>
								{isWithDeposits && <td>{formatter.format(totalDeposit)}</td>}
								<td>{formatter.format(totalInterest)}</td>
								<td>{formatter.format(balance)}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
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
			<div className="text-black dark:text-white">{formatter.format(amount)}</div>
		</div>
	</div>
);

function compoundInterest(
	principal: number,
	interestRate: number,
	time: number,
	interestAccrual: InterestAccrual
): number {
	const n = getInterestAccrualPerYear(interestAccrual);
	return principal * Math.pow(1 + interestRate / n, n * time);
}

function futureValue(
	monthlyPayment: number,
	interestRate: number,
	time: number,
	interestAccrual: InterestAccrual,
	depositsMadeAt: 'beginning' | 'end' = 'end'
): number {
	const n = getInterestAccrualPerYear(interestAccrual);

	return (
		monthlyPayment *
		((Math.pow(1 + interestRate / n, n * time) - 1) / (interestRate / n)) *
		(depositsMadeAt === 'end' ? 1 : 1 + interestRate / n)
	);
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parse(value: any): number {
	return Number.parseFloat(value.toString().replace(/,/g, ''));
}
