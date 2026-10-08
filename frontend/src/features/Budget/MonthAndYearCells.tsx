import { formatCurrency } from "../../utils/converters";
import { currency } from "./index";

export default function MonthAndYearCells({ value }: { value: number }) {
	return (
		<>
			<td className="currency">{formatCurrency(value, currency)}</td>
			<td className="currency">{formatCurrency(12 * value, currency)}</td>
		</>
	);
}
