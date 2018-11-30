describe('Smoke tests', () => {
  beforeEach(() => {
    cy.request('GET', '/api/todos')
      .its('body') // gets the body property of the response object, in this case, the array of todos from db.json.
      .each(todo => cy.request('DELETE', `/api/todos/${todo.id}`)) // will DELETE each todo, 1 by 1.
  })

  context('With no todos', () => {
    it('Saves new todos', () => {
      const items = [
        {text: 'Buy milk', expectedLength: 1},
        {text: 'Buy eggs', expectedLength: 2},
        {text: 'Buy bread', expectedLength: 3}
      ]
      cy.visit('/')
      cy.server() // this and next 2 lines creates a Request to back API that will eventually wait for response, to test that API is working. We avoid adding an artificial delay by doing this.
      cy.route('POST', '/api/todos')
        .as('create')

      cy.wrap(items)
        .each(todo => {
          cy.focused()
            .type(todo.text)
            .type('{enter}')

          cy.wait('@create')

          cy.get('.todo-list li')
            .should('have.length', todo.expectedLength)
        })

        // WHEN TESTING FOR 1 todo being added
      // cy.focused()
      //   .type('Buy milk')
      //   .type('{enter}')
      //
      // cy.wait('@create') // telling Cypress to WAIT for the response from API before moving on. This will stop Cypress from timing out on a test. INTERESTING.
      //
      // cy.get('.todo-list li')
      //   .should('have.length', 1)
    })
  })
})
