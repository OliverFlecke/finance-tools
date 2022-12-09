import { apiUrlWithPath } from '../../src/features/apiBase';

export function account() {
	cy.intercept('GET', `${apiUrlWithPath}/account`, {});
}
