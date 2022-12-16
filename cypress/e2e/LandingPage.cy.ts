import { host } from './constants';
import * as MockApi from '../mocks/api';

describe('Landing page', () => {
	it('Renders', () => {
		cy.visit(`${host}/`);
		cy.get('h2')
			.should('have.text', 'Tools to help with your finances')
			.should('have.class', 'text-center');
	});

	it('lists the account page in the description', () => {
		MockApi.account();

		cy.visit(host);
		cy.get('main ul').within(() => {
			cy.get('a[href*="accounts"]').click();
		});

		cy.url().should('include', '/accounts');
	});

	it('lists the stocks page in the description', () => {
		MockApi.stock();
		MockApi.stockTracked();

		cy.visit(host);
		cy.get('main ul').within(() => {
			cy.get('a[href*="stocks"]').click();
		});

		cy.url().should('include', '/stocks');
	});

	it('lists the interest calculator page in the description', () => {
		cy.visit(host);
		cy.get('main ul').within(() => {
			cy.get('a[href*="interest"]').click();
		});

		cy.url().should('include', '/interest');
	});

	it('list the tax calculator page in the description', () => {
		cy.visit(host);
		cy.get('main ul').within(() => {
			cy.get('a[href*="tax"]').click();
		});

		cy.url().should('include', '/tax');
	});

	it('list the budget feature in the description', () => {
		cy.visit(host);
		cy.get('main ul').within(() => {
			cy.get('a[href*="budget"]').click();
		});

		cy.url().should('include', '/budget');
	});
});
