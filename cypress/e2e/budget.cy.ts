import { host } from './constants';

describe('empty spec', () => {
	it('passes', () => {
		cy.visit(`${host}/budget`);
		cy.get('h2.page-header').should('have.text', 'Budget');
	});
});
