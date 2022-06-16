describe('home page', () => {
	it('displays coming soon on the home page', () => {
		cy.visit('/')
		cy.contains('Coming Soon')
	})

	it('takes us to the home page', () => {
		cy.get('[data-cy="nav-logo"]').click()
		cy.url().should('eq', 'http://localhost:3000/')
	})
})
