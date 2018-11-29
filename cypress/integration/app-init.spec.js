describe('App initialization', () => {
  it.only('Loads todos on page load', () => {
    cy.seedAndVisit() // this is a custom Command. Find the relevant code in support/commands.js

    cy.get('.todo-list li')
      .should('have.length', 4)
  })
})
