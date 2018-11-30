describe('Smoke tests', () => {
  beforeEach(() => {
    cy.request('GET', '/api/todos')
      .its('body') // gets the body property of the response object, in this case, the array of todos from db.json.
      .each(todo => cy.request('DELETE', `/api/todos/${todo.id}`)) // will DELETE each todo, 1 by 1.
  })

  context('With no todos', () => {
    it.only('Saves new todos', () => {
      cy.visit('/')
      cy.focused()
        .type('Buy milk{enter}')

      cy.get('.todo-list li')
        .should('have.length', 1)
    })
  })
})
