import React, { useMemo } from 'react';
import { FV } from 'services/formulas';
import AmountSummary from './AmountSummaryProps';
import { formatter, FormData } from './index';

const CalculationSummary: React.FC<FormData> = props => {
	const rate = useMemo(() => props.interestRate / 100, [props.interestRate]);
	const isWithDeposits = useMemo(() => props.monthlyDeposit !== 0, [props.monthlyDeposit]);

	const balance = FV(props.existingAmount, props.monthlyDeposit, rate, props.investmentPeriod);
	const totalDeposits = 12 * props.monthlyDeposit * props.investmentPeriod + props.existingAmount;
	const totalInterest = balance - totalDeposits;

	return (
		<>
			<div className="flex w-full flex-col items-center">
				<div className="grid w-full max-w-2xl grid-cols-1 justify-center gap-y-4 gap-x-8 p-8 md:grid-cols-2">
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
			<div className="-mx-4 overflow-x-scroll lg:m-0 lg:w-full lg:overflow-x-auto">
				<table className="w-full">
					<TableHeader isWithDeposits={isWithDeposits} />
					<tbody className="text-right font-mono">
						{[...Array(props.investmentPeriod + 1).keys()].map(year => (
							<TableRow
								key={year}
								{...props}
								year={year}
								rate={rate}
								isWithDeposits={isWithDeposits}
							/>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default CalculationSummary;

const TableHeader: React.FC<{ isWithDeposits: boolean }> = ({ isWithDeposits }) => (
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
);

interface TableRowProps extends FormData {
	year: number;
	rate: number;
	isWithDeposits: boolean;
}

const TableRow: React.FC<TableRowProps> = props => {
	const { rate, year, isWithDeposits } = props;
	const deposit = year === 0 ? props.existingAmount : 12 * props.monthlyDeposit;
	const totalDeposit = year * 12 * props.monthlyDeposit + props.existingAmount;
	const totalBalance = FV(props.existingAmount, props.monthlyDeposit, rate, year);
	const lastYear = year - 1;

	const depositPrevious = lastYear * 12 * props.monthlyDeposit + props.existingAmount;
	const balancePrevious = FV(props.existingAmount, props.monthlyDeposit, rate, lastYear);

	const totalInterest = totalBalance - totalDeposit;
	const interest = year === 0 ? 0 : totalInterest - (balancePrevious - depositPrevious);

	return (
		<tr key={year} className="odd:bg-gray-200 dark:odd:bg-gray-900">
			<td className="px-4 text-center">{year}</td>
			{isWithDeposits && <td className="px-4">{formatter.format(deposit)}</td>}
			<td className="px-4">{formatter.format(interest)}</td>
			{isWithDeposits && <td className="px-4">{formatter.format(totalDeposit)}</td>}
			<td className="px-4">{formatter.format(totalInterest)}</td>
			<td className="px-4">{formatter.format(totalBalance)}</td>
		</tr>
	);
};
