import { host } from './constants';

describe('Budget', () => {
	it('passes', () => {
		cy.visit(`${host}/budget`);
		cy.get('h2.page-header').should('have.text', 'Budget');
	});

	it('is able to retreive all budgets for user', () => {
		cy.visit(`${host}/budget`);

		// TODO: Assert a list of budgets are shown
	});
});
