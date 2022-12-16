import { host } from './constants';

describe('Account overview', () => {
	it('passes', () => {
		cy.visit(`${host}/accounts`);
		cy.get('h2.page-header').should('have.text', 'Budget');
	});
});
