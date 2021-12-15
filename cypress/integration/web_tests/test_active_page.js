describe('Initial page load', () => {
    it('Check existing elements', () => {
      cy.visit('http://localhost:19006/Login')
      cy.contains('ConQuiz')
      cy.contains('start your adventure now')

      cy.contains('Sign in with Google').click()
    })
  })