import { host } from './constants';
import * as MockApi from '../mocks/api';

describe('Navigation bar', () => {
	it('links in navigation bar is correct', () => {
		MockApi.account();

		cy.visit(`${host}`);
		cy.get('h1')
			.should('have.text', 'Finance tracker')
			.and('have.class', 'uppercase');

		// Check each link exists
		const links = [
			{ text: 'Overview', path: '/' },
			{ text: 'Stocks', path: '/stocks' },
			{ text: 'Interest', path: '/interest' },
			{ text: 'Tax calculator', path: '/tax' },
			{ text: 'Budget', path: '/budget' },
		];
		cy.get('nav > ul > li > a').each((link, i) => {
			cy.wrap(link)
				.should('have.text', links[i].text)
				.should('have.attr', 'href', links[i].path);
		});
	});
});
