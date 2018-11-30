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

    it('displays plural todos in count', () => {
      cy.get('.todo-count')
        .should('contain', '3 todos left')
    })

    // IF I was only testing for 1 filter option. Below is code to check ALL 3 filter options at same time.  Refactor and DRY.
    // it('Filters to active todos', () => {
    //   cy.contains('Active')  // find the link you want based on its CONTENT (text)
    //     .click()
    //
    //   cy.get('.todo-list li')
    //     .should('have.length', 3)
    // })

    it.only('Handles filter links', () => {
      const filters = [
        {link: 'Active', expectedLength: 3},
        {link: 'Completed', expectedLength: 1},
        {link: 'All', expectedLength: 4}
      ]
      cy.wrap(filters)  // this puts filters in the context of Cypress.  This now allows us to chain on additional Cypress commands.
        .each(filter => {
          cy.contains(filter.link)
            .click()

          cy.get('.todo-list li')
            .should('have.length', filter.expectedLength)
        })
    })
  })
})
