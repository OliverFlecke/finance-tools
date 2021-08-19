export class Money {
	value: number;
	currency?: string;

	constructor(value: number, currency?: string) {
		this.value = value;
		this.currency = currency;
	}

	public formatCurrency(): string {
		return this.value.toLocaleString(undefined, {
			style: 'currency',
			currency: this.currency ?? 'USD',
			currencyDisplay: 'code',
		});
	}
}
