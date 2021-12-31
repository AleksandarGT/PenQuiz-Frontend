describe('Initial page load', () => {
  it('Check existing elements', () => {
    cy.visit('https://conquiz.netlify.app/Login')

    cy.contains('ConQuiz')
    cy.contains('start your adventure now')

    cy.contains('Sign in with Google').click()
  })

  it('Check rules modal', () => {
    cy.visit('https://conquiz.netlify.app/Login')

    cy.contains('ConQuiz')
    cy.contains('start your adventure now')

    cy.contains('Rules').click()
    cy.contains('ConQuiz is a round-based PvP trivia game revolved around capturing the territories of the continent of Antarctica.')
  })

  it('Check about button', () => {
    cy.visit('https://conquiz.netlify.app/Login')

    cy.contains('ConQuiz')
    cy.contains('start your adventure now')

    cy.contains('About').click()
  })
})