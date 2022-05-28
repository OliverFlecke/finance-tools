import { Button, Input, Select, SelectOption } from '@oliverflecke/components-react';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { InterestAccrual } from 'services/formulas';
import { parseNumber } from 'utils/converters';
import CalculationSummary from './CalculationSummary';
import NumberFormat from 'react-number-format';

interface CompoundInterestProps {
	name?: string;
}

export type FormData = {
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
		setValue,
	} = useForm<FormData>({});
	const onSubmit = handleSubmit(d => {
		console.debug(d);
		setData(d);
	});

	return (
		<div className="pb-4 dark:bg-gray-800">
			<h2 className="px-4 py-4 text-xl lg:text-left">Compound interest calculator</h2>
			<form onSubmit={onSubmit} className="flex-col-center w-full overflow-x-hidden px-4">
				<fieldset className="flex flex-col items-start space-y-6 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0">
					<NumberFormat
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						customInput={(props: any) => (
							<Input
								{...props}
								label="Existing amount"
								errorMessage={errors.existingAmount?.message}
								className="dark:placeholder-gray-600"
								placeholder="20,000"
								inputMode="numeric"
							/>
						)}
						thousandSeparator={true}
						onValueChange={x => setValue('existingAmount', x.floatValue ?? 0)}
						{...register('existingAmount', { required: 'Please provide your existing amount' })}
					/>
					<Input
						label="Expected yearly growth"
						placeholder="7"
						className="dark:placeholder-gray-600"
						errorMessage={errors.interestRate?.message}
						{...register('interestRate', {
							required: 'Please provide a valid value',
						})}
					/>
					<Input
						label="Investment period"
						placeholder="10"
						className="dark:placeholder-gray-600"
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
					<NumberFormat
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						customInput={(props: any) => (
							<Input
								{...props}
								label="Monthly deposit"
								placeholder="10,000"
								inputMode="numeric"
								className="dark:placeholder-gray-600"
								errorMessage={errors.monthlyDeposit?.message}
							/>
						)}
						thousandSeparator={true}
						onValueChange={x => setValue('monthlyDeposit', x.floatValue ?? 0)}
						{...register('monthlyDeposit', {
							required: 'Please provide how much you will deposit each month',
						})}
					/>
				</fieldset>
				<div className="flex w-full justify-center pt-4">
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

export const formatter = Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'DKK',
});
