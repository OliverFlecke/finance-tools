/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
	Button,
	Input,
	Select,
	SelectOption,
} from '@oliverflecke/components-react';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { InterestAccrual } from 'services/formulas';
import { parseNumber } from 'utils/converters';
import { allPropertiesAreDefined } from 'utils/general';
import CalculationSummary from './CalculationSummary';

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

const CompoundInterest: FC<CompoundInterestProps> = () => {
	const [data, setData] = useState<FormData | null>(null);
	const defaultValues = useDefaultValues();

	useEffect(() => {
		if (allPropertiesAreDefined(defaultValues)) {
			setData(defaultValues);
		}
	}, [defaultValues]);

	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues,
	});
	const onSubmit = handleSubmit(data => {
		const url = new URL(window.location.href);
		console.log(data);
		Object.keys(data).forEach(key =>
			url.searchParams.set(key, data[key as keyof FormData].toString()),
		);
		window.history.replaceState(null, '', url.toString());

		setData(data);
	});

	const resetForm = useCallback(() => {
		const url = new URL(window.location.href);
		url.search = '';
		window.location.href = url.toString();
	}, []);

	return (
		<div className="pb-4 dark:bg-gray-800">
			<h2 className="px-4 py-4 text-xl lg:text-left">
				Compound interest calculator
			</h2>
			<form
				onSubmit={onSubmit}
				className="flex-col-center w-full overflow-x-hidden px-4"
			>
				<fieldset className="flex flex-col items-start space-y-6 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0">
					<NumericFormat
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
						defaultValue={defaultValues.existingAmount}
						thousandSeparator={true}
						onValueChange={x => setValue('existingAmount', x.floatValue ?? 0)}
						{...register('existingAmount', {
							required: 'Please provide your existing amount',
							valueAsNumber: true,
						})}
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
					<NumericFormat
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
						defaultValue={defaultValues.monthlyDeposit}
						thousandSeparator={true}
						onValueChange={x => setValue('monthlyDeposit', x.floatValue ?? 0)}
						{...register('monthlyDeposit', {
							required: 'Please provide how much you will deposit each month',
							valueAsNumber: true,
						})}
					/>
				</fieldset>
				<div className="flex w-full justify-center space-x-4 pt-4">
					<Button type="submit">Calculate</Button>
					<Button type="reset" buttonType="Secondary" onClick={resetForm}>
						Reset
					</Button>
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

function useDefaultValues(): FormData {
	return useMemo<FormData>(() => {
		if (typeof window === 'undefined') return {} as FormData;

		const params = new URL(window.location.href).searchParams;

		function getNumber(name: string): number {
			// We allow return of undefined here even though the type does not match. It us only used to populate the default value of the form.
			return params.has(name)
				? Number.parseFloat(params.get(name)!)
				: undefined!;
		}

		return {
			existingAmount: getNumber('existingAmount'),
			interestRate: getNumber('interestRate'),
			investmentPeriod: getNumber('investmentPeriod'),
			interestAccural:
				(params.get('interestAccural') as InterestAccrual) ?? 'Yearly',
			monthlyDeposit: getNumber('monthlyDeposit'),
		};
	}, []);
}
