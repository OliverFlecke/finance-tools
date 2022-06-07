type TaxCalculatorAction =
	| { type: 'SET SALARY'; salary: number }
	| { type: 'SET CURRENCY'; currency: string };

export default TaxCalculatorAction;
