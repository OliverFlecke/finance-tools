import clsx from "clsx";
import { useSettingsContext } from "features/Settings/context";
import { getValueColorIndicator } from "utils/colors";
import { convertToCurrency, formatCurrency } from "utils/converters";
import { useAccountContext } from "../Context";
import styles from "./RowSummary.module.css";
import { useSummarizedAccounts } from "./useSummarizedAccounts";

interface RowSummaryProps {
	index: number;
	date: Date;
	totals: number[];
}

export default function RowSummary({ index, date, totals }: Readonly<RowSummaryProps>) {
	const { accounts, entries } = useAccountContext();
	const {
		values: { preferredDisplayCurrency: currency },
	} = useSettingsContext();

	const gain = index === 0 ? 0 : totals[index] - totals[index - 1];
	const total = totals[index];
	const cash = useSummarizedAccounts(accounts, entries, date, (x) => x.kind === "Cash");
	const invested = useSummarizedAccounts(accounts, entries, date, (x) => x.kind === "Investment");

	return (
		<>
			<td className={clsx(getValueColorIndicator(gain), styles.cell_summary)}>
				{formatCurrency(gain, currency)}
				<Tooltip value={gain} />
			</td>

			<td className={clsx("text-blue-700 dark:text-blue-500", styles.cell_summary)}>
				{formatCurrency(total, currency)}
				<Tooltip value={total} />
			</td>

			<td className={clsx("text-yellow-700 dark:text-yellow-500", styles.cell_summary)}>
				{formatCurrency(cash, currency)}
				<Tooltip value={cash} />
			</td>

			<td className={clsx("text-purple-700 dark:text-purple-500", styles.cell_summary)}>
				{formatCurrency(invested, currency)}
				<Tooltip value={invested} />
			</td>
		</>
	);
}

interface TooltipProps {
	value: number;
}

/** Displays the value in a list with the value converted to all preferred currencies. */
function Tooltip({ value }: Readonly<TooltipProps>) {
	const {
		values: { preferredDisplayCurrency, preferredCurrencies, currencyRates },
	} = useSettingsContext();

	return (
		<ol>
			{preferredCurrencies.map((code) => (
				<li key={code}>
					{formatCurrency(
						convertToCurrency(value, currencyRates.usd, preferredDisplayCurrency, code),
						code,
					)}
				</li>
			))}
		</ol>
	);
}
