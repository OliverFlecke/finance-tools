import { CurrencyRates, getCurrencies } from '@/API/currency';
import { convertToCurrency, formatCurrency } from '../../utils/converters';

type Period = 'Month' | 'Quarter' | 'Year';

interface CategoryData {
	name: string;
	color?: string;
	children?: CategoryData[];
	period?: string;
	amount?: number;
	currency?: string;
}

export class Category {
	public name: string;
	public color: string;
	public children: Category[];
	public isOpen = true;

	period: Period;
	money?: number;
	currency: string;
	rates?: CurrencyRates;

	constructor(data: CategoryData, rates?: CurrencyRates) {
		this.name = data.name;
		this.color = data.color ?? '#64748B';
		this.money = data.amount;
		this.period = (data.period as Period) ?? 'Month';
		this.currency = data.currency ?? 'GBP';
		this.rates = rates;
		this.children = (data.children ?? [])
			.map((x) => new Category(x, rates))
			.sort((a, b) => b.amount - a.amount);
	}

	get isLeaf(): boolean {
		return this.children.length === 0;
	}

	get amount(): number {
		if (this.money) {
			switch (this.period) {
				case 'Year':
					return this.money / 12;
				case 'Quarter':
					return this.money / 3;

				case 'Month':
				default:
					return this.money;
			}
		}

		return this.children.reduce((acc, c) => {
			const amount =
				this.currency !== c.currency && this.rates
					? convertToCurrency(
							c.amount,
							c.currency,
							this.currency,
							this.rates.usd
					  )
					: c.amount;

			return acc + amount;
		}, 0);
	}

	public getAmount(currency: string): number {
		return convertToCurrency(
			this.amount,
			this.currency,
			currency,
			this.rates?.usd
		);
	}

	public getFormatted(currency?: string): string {
		const amount = currency ? this.getAmount(currency) : this.amount;
		return formatCurrency(amount, currency ?? this.currency, {
			maximumFractionDigits: 0,
		});
	}

	public expand(open = true): void {
		this.isOpen = open;
		this.children.forEach((x) => x.expand(open));
	}

	public removeChild(child: Category): void {
		this.children = this.children.filter((x) => x.name !== child.name);
		this.children.forEach((x) => x.removeChild(child));
	}
}
