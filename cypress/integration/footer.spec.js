describe('Footer', () => {
  context('with a single incomplete todo', () => {
    it('displays a singular todo in count', () => {
      cy.seedAndVisit([{id: 1, name: 'Buy milk', isComplete: false}])
      cy.get('.todo-count')
        .should('contain', '1 todo left')
    })
  })

  context('with multiple todos', () => {
    beforeEach(( => {
      
    }))
    it.only('display plural todos in count', () => {
      cy.seedAndVisit()

      cy.get('.todo-count')
        .should('contain', '3 todos left')
    })
  })
})
