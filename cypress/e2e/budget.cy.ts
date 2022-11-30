describe('empty spec', () => {
	it('passes', () => {
		cy.visit('https://localhost:3000/budget');
		cy.get('h2.page-header').contains('Budget');
	});
});
