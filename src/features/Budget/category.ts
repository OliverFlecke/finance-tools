import { CurrencyRates } from '@/API/currency';
import { convertToCurrency, formatCurrency } from '../../utils/converters';

type Period = 'Month' | 'Quarter' | 'Year';

interface CategoryData {
	name: string;
	color?: string;
	children?: CategoryData[];
	period?: string;
	amount?: number;
	money?: number;
	currency?: string;
	currencyRates?: CurrencyRates;
}

export class Category implements CategoryData {
	public name: string;
	public color: string;
	public children: Category[];
	public isOpen = true;

	period: Period;
	amount?: number;
	currency: string;
	currencyRates?: CurrencyRates;

	constructor(data: CategoryData) {
		this.name = data.name;
		this.color = data.color ?? '#64748B';
		this.amount = data.amount;
		this.period = (data.period as Period) ?? 'Month';
		this.currency = data.currency ?? 'GBP';
		this.currencyRates = data.currencyRates;
		this.children = (data.children ?? [])
			.map(x => new Category({ currencyRates: data.currencyRates, ...x }))
			.sort((a, b) => b.getAmount() - a.getAmount());
	}

	get isLeaf(): boolean {
		return this.children.length === 0;
	}

	private calculateAmount(): number {
		if (this.amount) {
			switch (this.period) {
				case 'Year':
					return this.amount / 12;
				case 'Quarter':
					return this.amount / 3;

				case 'Month':
				default:
					return this.amount;
			}
		}

		return this.children.reduce((acc, c) => {
			const amount =
				this.currency !== c.currency && this.currencyRates
					? convertToCurrency(
							c.getAmount(),
							c.currency,
							this.currency,
							this.currencyRates.usd
					  )
					: c.getAmount();

			return acc + amount;
		}, 0);
	}

	public getAmount(currency?: string): number {
		if (currency) {
			return convertToCurrency(
				this.calculateAmount(),
				this.currency,
				currency,
				this.currencyRates?.usd
			);
		}

		return this.calculateAmount();
	}

	public getFormatted(currency?: string): string {
		return formatCurrency(this.getAmount(currency), currency ?? this.currency, {
			maximumFractionDigits: 0,
		});
	}

	public expand(open = true): void {
		this.isOpen = open;
		this.children.forEach(x => x.expand(open));
	}

	public removeChild(child: Category): Category {
		return new Category({
			...this,
			amount: this.amount,
			children: this.children
				.filter(x => x.name !== child.name)
				.map(x => x.removeChild(child)),
		});
	}
}
