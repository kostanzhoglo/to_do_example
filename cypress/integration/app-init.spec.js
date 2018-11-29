describe('App initialization', () => {
  it.only('Loads todos on page load', () => {
    cy.server()
    // 3rd argument is the RESPONSE BODY from the API call, and we want to respond with an array of todos.
    cy.route('GET', '/api/todos', 'fixture:todos')
    cy.visit('/')

    cy.get('.todo-list li')
      .should('have.length', 4)
  })
})
