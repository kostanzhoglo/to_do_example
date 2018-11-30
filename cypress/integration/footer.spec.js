describe('Footer', () => {
  context('with a single incomplete todo', () => {
    it('displays a singular todo in count', () => {
      cy.seedAndVisit([{id: 1, name: 'Buy milk', isComplete: false}])
      cy.get('.todo-count')
        .should('contain', '1 todo left')
    })
  })

  context('with multiple todos', () => {
    beforeEach(() => {
      cy.seedAndVisit()
    })

    it('display plural todos in count', () => {
      cy.get('.todo-count')
        .should('contain', '3 todos left')
    })

    it.only('Filters to active todos', () => {
      cy.contains('Active')  // find the link you want based on its CONTEN (text)
        .click()

      cy.get('.todo-list li')
        .should('have.length', 3)
    })
  })
})
