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

  it('Removes a todo', () => {
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

  it.only('Marks an incomplete item complete', () => { // UPDATING a todo
    // This WHOLE first part of this test is to ALTER one of the todos from our fixture array
    // so it'll make sense for THIS test, and won't screw up our other testing data from fixtures.
    cy.fixture('todos') // accessing todos.json file data
      .then((todos) => {
        const target = Cypress._.head(todos) // lodash's head() method. Grabs the first todo in the todos array.
        // so TARGET now === the first todo in the todos array.
        cy.route('PUT', `/api/todos/${target.id}`, Cypress._.merge(target, {isComplete: true}))
        // response body above (3rd parameter) needs to be updated version of target todo we are grabbing.
      })
    // OK, so now the first item in todos is AS WE NEED IT FOR THIS TEST. Back to your regularly scheduled program...
    cy.get('.todo-list li')
      .first()
      .as('first-todo')

    cy.get('@first-todo')
      .find('.toggle')
      .click()
      .should('be.checked')

    cy.get('@first-todo')
      .should('have.class', 'completed')

    cy.get('.todo-count')
      .should('contain', 2)
  })
})
