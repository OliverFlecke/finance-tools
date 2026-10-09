import clsx from "clsx";
import { useSettingsContext } from "features/Settings/context";
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
	const invested = useSummarizedAccounts(
		accounts,
		entries,
		date,
		(x) => x.kind === "Investment" || x.kind === "Pension",
	);

	const gainClass = gain > 0 ? styles.gain_positive : gain < 0 ? styles.gain_negative : undefined;

	return (
		<>
			<td className={clsx(gainClass, styles.cell_summary)}>
				{formatCurrency(gain, currency)}
				<Tooltip value={gain} />
			</td>

			<td className={clsx(styles.total, styles.cell_summary)}>
				{formatCurrency(total, currency)}
				<Tooltip value={total} />
			</td>

			<td className={clsx(styles.total_cash, styles.cell_summary)}>
				{formatCurrency(cash, currency)}
				<Tooltip value={cash} />
			</td>

			<td className={clsx(styles.total_investments, styles.cell_summary)}>
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
