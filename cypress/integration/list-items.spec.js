describe('List-items', () => {
  beforeEach(() => {
    cy.seedAndVisit()
  })

  it.only('properly displays completed list items', () => {
    cy.get('.todo-list li')
      .filter('.completed')
      .should('have.length', 1)
      .and('contain', 'Eggs')
      .find('.toggle')
      .should('be.checked')
  })
})
