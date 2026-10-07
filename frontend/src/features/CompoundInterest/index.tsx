/* eslint-disable @typescript-eslint/no-non-null-assertion */
"use client";

import clsx from "clsx";
import { type FC, useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import type { InterestAccrual } from "services/formulas";
import { parseNumber } from "utils/converters";
import { allPropertiesAreDefined } from "utils/general";
import { Button } from "@/ui/Button/Button";
import { Input } from "@/ui/Input/Input";
import { Select, SelectOption } from "@/ui/Select/Select";
import CalculationSummary from "./CalculationSummary";
import styles from "./index.module.css";

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
	const onSubmit = handleSubmit((data) => {
		const url = new URL(window.location.href);
		console.log(data);
		Object.keys(data).forEach((key) => {
			url.searchParams.set(key, data[key as keyof FormData].toString());
		});
		window.history.replaceState(null, "", url.toString());

		setData(data);
	});

	const resetForm = useCallback(() => {
		const url = new URL(window.location.href);
		url.search = "";
		window.location.href = url.toString();
	}, []);

	return (
		<div className={styles.container}>
			<h2 className={styles.heading}>Compound interest calculator</h2>
			<form onSubmit={onSubmit} className={clsx("flex-col-center", styles.form)}>
				<fieldset className={styles.fieldset}>
					<NumericFormat
						// biome-ignore lint/suspicious/noExplicitAny: unknown type
						customInput={(props: any) => (
							<Input
								{...props}
								label="Existing amount"
								errorMessage={errors.existingAmount?.message}
								className={styles.placeholder}
								placeholder="20,000"
								inputMode="numeric"
							/>
						)}
						defaultValue={defaultValues.existingAmount}
						thousandSeparator={true}
						onValueChange={(x) => setValue("existingAmount", x.floatValue ?? 0)}
						{...register("existingAmount", {
							required: "Please provide your existing amount",
							valueAsNumber: true,
						})}
					/>
					<Input
						label="Expected yearly growth"
						placeholder="7"
						className={styles.placeholder}
						errorMessage={errors.interestRate?.message}
						{...register("interestRate", {
							required: "Please provide a valid value",
						})}
					/>
					<Input
						label="Investment period"
						placeholder="10"
						className={styles.placeholder}
						errorMessage={errors.investmentPeriod?.message}
						{...register("investmentPeriod", {
							required: "Please provide a number of years you are investing",
						})}
					/>
					<Select
						label="Interval of interest accural"
						{...register("interestAccural", { required: true })}
					>
						<SelectOption value="Yearly">Yearly</SelectOption>
						<SelectOption value="Monthly">Monthly</SelectOption>
					</Select>
					<NumericFormat
						// biome-ignore lint/suspicious/noExplicitAny: unknown type
						customInput={(props: any) => (
							<Input
								{...props}
								label="Monthly deposit"
								placeholder="10,000"
								inputMode="numeric"
								className={styles.placeholder}
								errorMessage={errors.monthlyDeposit?.message}
							/>
						)}
						defaultValue={defaultValues.monthlyDeposit}
						thousandSeparator={true}
						onValueChange={(x) => setValue("monthlyDeposit", x.floatValue ?? 0)}
						{...register("monthlyDeposit", {
							required: "Please provide how much you will deposit each month",
							valueAsNumber: true,
						})}
					/>
				</fieldset>
				<div className={styles.actions}>
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

export const formatter = Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "DKK",
});

function useDefaultValues(): FormData {
	return useMemo<FormData>(() => {
		if (typeof window === "undefined") return {} as FormData;

		const params = new URL(window.location.href).searchParams;

		function getNumber(name: string): number {
			return params.has(name) ? Number.parseFloat(params.get(name) ?? "") : Number.NaN;
		}

		return {
			existingAmount: getNumber("existingAmount"),
			interestRate: getNumber("interestRate"),
			investmentPeriod: getNumber("investmentPeriod"),
			interestAccural: (params.get("interestAccural") as InterestAccrual) ?? "Yearly",
			monthlyDeposit: getNumber("monthlyDeposit"),
		};
	}, []);
}
