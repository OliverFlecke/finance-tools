import React from 'react';
import LoginButton from 'features/login/LoginButton';
import LoginState from 'features/login/LoginState';
import { User } from 'utils/githubAuth';

describe('LoginButton', () => {
	it('Login button with link', () => {
		const url = 'some-random-url';
		cy.mount(<LoginButton authorizeUrl={url} />);
		cy.get('a')
			.should('have.attr', 'href', url)
			.and('have.class', 'btn')
			.and('have.text', 'Login');
	});
});

describe('LoginState', () => {
	beforeEach(() => {
		cy.viewport(100, 50);
	});

	it('Without authorized user should just show a login button', () => {
		const url = 'url to login';
		const logoutUrl = 'url to logout';
		cy.mount(
			<LoginState user={null} authorizeUrl={url} logoutUrl={logoutUrl} />,
		);
		cy.get('a')
			.should('have.attr', 'href', url)
			.and('have.class', 'btn')
			.and('have.class', 'btn-primary')
			.and('have.text', 'Login');

		cy.screenshot({ overwrite: true });
	});

	it('With an authorized user', () => {
		const url = 'url to login';
		const logoutUrl = 'url to logout';
		const user: User = {
			id: 1,
			avatar_url: 'https://avatars.githubusercontent.com/u/7227658?v=4',
		};
		cy.mount(
			<LoginState user={user} authorizeUrl={url} logoutUrl={logoutUrl} />,
		);

		cy.get('img')
			.should('have.attr', 'src', user.avatar_url + '&s=80')
			.and('have.attr', 'alt', 'Avatar of the logged in user');
		cy.screenshot({ overwrite: true });
	});
});
