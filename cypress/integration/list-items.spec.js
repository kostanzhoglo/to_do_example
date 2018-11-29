describe('List-items', () => {
  beforeEach(() => {
    cy.seedAndVisit()
  })

  it('properly displays completed list items', () => {
    cy.get('.todo-list li')
      .filter('.completed')
      .should('have.length', 1)
      .and('contain', 'Eggs')
      .find('.toggle')
      .should('be.checked')
  })

  it('Shows remaining todos in the footer', () => {
    cy.get('.todo-count')
      .should('contain', 3)
  })

  it.only('Removes a todo', () => {
    cy.route({
      url: '/api/todos/1',
      method: 'DELETE',
      status: 200,
      response: {}
    })

    cy.get('.todo-list li')
      .as('list')  // can now grab the line above as alias:  <<<  @list  >>>

    cy.get('@list') // alias as mentioned above!
      .first() // grabs FIRST list item in .todo-list li array.
      .find('.destroy')
      .invoke('show') // makes Delete button visible, by SHOWing it. Once it's SHOWn, now Cypress tests can interact with it and 'click' it.
      .click()
      // .click({force: true})   // this is the NOT preferred way of forcing a hidden element to appear because it disables Cypress' internal checks.  Better to use .invoke('show') method above instead.

    cy.get('@list')
      .should('have.length', 3)
      .and('not.contain', 'Milk')
  })
})
