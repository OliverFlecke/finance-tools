import clsx from "clsx";
import type React from "react";
import { useMemo } from "react";
import { FV } from "services/formulas";
import AmountSummary from "./AmountSummaryProps";
import styles from "./CalculationSummary.module.css";
import { type FormData, formatter } from "./index";

const CalculationSummary: React.FC<FormData> = (props) => {
	const rate = useMemo(() => props.interestRate / 100, [props.interestRate]);
	const isWithDeposits = useMemo(() => props.monthlyDeposit !== 0, [props.monthlyDeposit]);

	const balance = FV(props.existingAmount, props.monthlyDeposit, rate, props.investmentPeriod);
	const totalDeposits = 12 * props.monthlyDeposit * props.investmentPeriod + props.existingAmount;
	const totalInterest = balance - totalDeposits;

	return (
		<>
			<div className={styles.wrapper}>
				<div className={styles.grid}>
					<AmountSummary
						amount={balance}
						label={`Balance after ${props.investmentPeriod} years`}
						color={styles.dot_blue}
					/>
					<AmountSummary
						amount={props.existingAmount}
						label={`Initial amount`}
						color={styles.dot_green}
					/>
					<AmountSummary
						amount={totalDeposits}
						label={`Total deposits`}
						color={styles.dot_indigo}
					/>
					<AmountSummary
						amount={totalInterest}
						label={"Gain from interest"}
						color={styles.dot_yellow}
					/>
				</div>
			</div>
			<div className={styles.table_wrapper}>
				<table className={styles.table}>
					<TableHeader isWithDeposits={isWithDeposits} />
					<tbody className={styles.body}>
						{[...Array(props.investmentPeriod + 1).keys()].map((year) => (
							<TableRow
								key={year}
								{...props}
								year={year}
								rate={rate}
								isWithDeposits={isWithDeposits}
								isLastRow={year === props.investmentPeriod}
							/>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default CalculationSummary;

export const typeColors = {
	deposit: styles.text_deposit,
	interest: styles.text_interest,
	totalDeposit: styles.text_total_deposit,
	totalInterest: styles.text_total_interest,
	balance: styles.text_balance,
};

const TableHeader: React.FC<{ isWithDeposits: boolean }> = ({ isWithDeposits }) => (
	<thead>
		<tr className={styles.header_row}>
			<th className={clsx(styles.cell, styles.cell_center)}>Year</th>
			{isWithDeposits && <th className={clsx(styles.cell, typeColors.deposit)}>Deposit</th>}
			<th className={clsx(styles.cell, typeColors.interest)}>Interest</th>
			{isWithDeposits && (
				<th className={clsx(styles.cell, typeColors.totalDeposit)}>Total deposits</th>
			)}
			<th className={clsx(styles.cell, typeColors.totalInterest)}>Total interest</th>
			<th className={clsx(styles.cell, typeColors.balance)}>Balance</th>
			<th className={styles.cell}>Date</th>
		</tr>
	</thead>
);

interface TableRowProps extends FormData {
	year: number;
	rate: number;
	isWithDeposits: boolean;
	isLastRow: boolean;
}

const TableRow: React.FC<TableRowProps> = (props) => {
	const { rate, year, isWithDeposits, isLastRow } = props;
	const deposit = year === 0 ? props.existingAmount : 12 * props.monthlyDeposit;
	const totalDeposit = year * 12 * props.monthlyDeposit + props.existingAmount;
	const totalBalance = FV(props.existingAmount, props.monthlyDeposit, rate, year);
	const lastYear = year - 1;

	const depositPrevious = lastYear * 12 * props.monthlyDeposit + props.existingAmount;
	const balancePrevious = FV(props.existingAmount, props.monthlyDeposit, rate, lastYear);

	const totalInterest = totalBalance - totalDeposit;
	const interest = year === 0 ? 0 : totalInterest - (balancePrevious - depositPrevious);

	return (
		<tr key={year} className={styles.row}>
			<td className={clsx(styles.cell, styles.cell_center)}>{year}</td>
			{isWithDeposits && (
				<td className={clsx(styles.cell, isLastRow && typeColors.deposit)}>
					{formatter.format(deposit)}
				</td>
			)}
			<td className={clsx(styles.cell, isLastRow && typeColors.interest)}>
				{formatter.format(interest)}
			</td>
			{isWithDeposits && (
				<td className={clsx(styles.cell, isLastRow && typeColors.totalDeposit)}>
					{formatter.format(totalDeposit)}
				</td>
			)}
			<td className={clsx(styles.cell, isLastRow && typeColors.totalInterest)}>
				{formatter.format(totalInterest)}
			</td>
			<td className={clsx(styles.cell, isLastRow && typeColors.balance)}>
				{formatter.format(totalBalance)}
			</td>
			<td className={styles.cell}>{addYears(new Date(), year).toLocaleDateString()}</td>
		</tr>
	);
};

function addYears(date: Date, years: number): Date {
	date.setFullYear(date.getFullYear() + years);
	return date;
}
