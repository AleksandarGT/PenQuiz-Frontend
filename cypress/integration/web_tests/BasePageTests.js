describe('Initial page load', () => {
  beforeEach(() => {
    cy.visit('http://localhost:19006/')
    cy.contains('PenQuiz')
    cy.contains('start your adventure now')
  })
  it('Check existing elements', () => {
    cy.contains('Sign in with Google').click()
  })

  it('Check rules modal', () => {

    cy.contains('Rules').click()
    cy.contains('PenQuiz is a round-based PvP trivia game revolved around capturing the territories of the continent of Antarctica.')
  })

  it('Check about button', () => {
    cy.contains('About').click()
  })
})