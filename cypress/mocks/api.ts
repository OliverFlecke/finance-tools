import { apiUrlWithPath } from '../../src/features/apiBase';

export function account() {
	cy.intercept('GET', `${apiUrlWithPath}/account`, {});
}

export function stockTracked() {
	cy.intercept('GET', `${apiUrlWithPath}/stock/tracked`, []);
}

export function stock() {
	cy.intercept('GET', `${apiUrlWithPath}/stock?*`, []);
}
