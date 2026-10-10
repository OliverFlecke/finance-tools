import type { AccountKind } from "@/api/generated/types.gen";
import { useSettingsContext } from "@/features/Settings/context";
import { formatCurrency } from "@/utils/converters";
import styles from "./AccountSummary.module.css";
import { useAccountContext } from "./Context";
import { summarizedAccounts } from "./table/useSummarizedAccounts";

const NET_WORTH_COLOR = "var(--color-metric-blue)";

const KINDS: { kind: AccountKind; label: string; color: string }[] = [
	{ kind: "Cash", label: "Cash", color: "var(--color-metric-yellow)" },
	{ kind: "Investment", label: "Investment", color: "var(--color-metric-purple)" },
	{ kind: "Pension", label: "Pension", color: "var(--color-chart-indigo)" },
];

export default function AccountSummary() {
	const { accounts, entries } = useAccountContext();
	const { values } = useSettingsContext();
	const currency = values.preferredDisplayCurrency;

	const latestDate = Object.keys(entries).at(-1);
	if (!latestDate) return null;

	const date = new Date(latestDate);
	const amounts = KINDS.map(({ kind, ...rest }) => ({
		...rest,
		amount: summarizedAccounts(accounts, entries, date, values, (a) => a.kind === kind),
	}));
	const total = amounts.reduce((sum, { amount }) => sum + amount, 0);

	return (
		<div className={styles.container}>
			<div className={styles.stats}>
				<div className={styles.stat}>
					<span className={styles.dot} style={{ backgroundColor: NET_WORTH_COLOR }} />
					<div>
						<span className={styles.label}>Net worth</span>
						<span className={styles.amount}>{formatCurrency(total, currency)}</span>
					</div>
				</div>
				{amounts.map(({ label, color, amount }) => (
					<div className={styles.stat} key={label}>
						<span className={styles.dot} style={{ backgroundColor: color }} />
						<div>
							<span className={styles.label}>{label}</span>
							<span className={styles.amount}>
								{formatCurrency(amount, currency)}
								{total > 0 && (
									<span className={styles.percent}> ({Math.round((amount / total) * 100)}%)</span>
								)}
							</span>
						</div>
					</div>
				))}
			</div>
			<Pie amounts={amounts} currency={currency} total={total} />
		</div>
	);
}

interface PieProps {
	amounts: { label: string; color: string; amount: number }[];
	currency: string;
	total: number;
}

const CENTER = 50;
const RADIUS = 48;
const LABEL_RADIUS = RADIUS * 0.65;

function arcPoint(fraction: number, radius: number): [number, number] {
	const angle = fraction * 2 * Math.PI - Math.PI / 2;
	return [CENTER + radius * Math.cos(angle), CENTER + radius * Math.sin(angle)];
}

function Pie({ amounts, currency, total }: Readonly<PieProps>) {
	if (total <= 0) return null;

	let cursor = 0;
	const slices = amounts
		.filter(({ amount }) => amount > 0)
		.map(({ label, color, amount }) => {
			const start = cursor;
			const fraction = amount / total;
			cursor += fraction;
			return { label, color, amount, start, end: cursor, fraction };
		});

	return (
		<svg
			aria-label="Distribution of account kinds"
			className={styles.pie}
			role="img"
			viewBox={`0 0 ${CENTER * 2} ${CENTER * 2}`}
		>
			{slices.map((slice) => {
				const [x1, y1] = arcPoint(slice.start, RADIUS);
				const [x2, y2] = arcPoint(slice.end, RADIUS);
				const largeArc = slice.fraction > 0.5 ? 1 : 0;
				const [lx, ly] = arcPoint((slice.start + slice.end) / 2, LABEL_RADIUS);
				const percent = Math.round(slice.fraction * 100);

				return (
					<g key={slice.label}>
						<path
							d={`M ${CENTER} ${CENTER} L ${x1} ${y1} A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${x2} ${y2} Z`}
							fill={slice.color}
						>
							<title>
								{slice.label}: {formatCurrency(slice.amount, currency)} ({percent}%)
							</title>
						</path>
						{percent >= 8 && (
							<text className={styles.pie_label} textAnchor="middle" x={lx} y={ly}>
								{percent}%
							</text>
						)}
					</g>
				);
			})}
		</svg>
	);
}
