import { Account } from '../models/Account';

class AccountService {
	private accounts: Account[];

	constructor() {
		const data = localStorage.getItem('accounts') ?? '';
		console.log(data);
		this.accounts = data === undefined || data === '' ? [] : JSON.parse(data);
	}

	public getAccounts(): Account[] {
		return this.accounts;
	}

	public add(account: Account): void {
		this.accounts.push(account);
		this.save();
	}

	private save() {
		localStorage.setItem('accounts', JSON.stringify(this.accounts));
	}
}

export default AccountService;
