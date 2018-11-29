const todos = [
  {
    "id": 1,
    "name": "Buy Milk",
    "isComplete": false
  },
  {
    "id": 2,
    "name": "Buy Eggs",
    "isComplete": false
  },
  {
    "id": 3,
    "name": "Buy Bread",
    "isComplete": false
  },
  {
    "id": 4,
    "name": "Make French Toast",
    "isComplete": false
  }
]
describe('App initialization', () => {
  it.only('Loads todos on page load', () => {
    cy.server()
    // 3rd argument is the RESPONSE BODY from the API call, and we want to respond with an array of todos.
    cy.route('GET', '/api/todos', todos)
    cy.visit('/')

    cy.get('.todo-list li')
      .should('have.length', 4)
  })
})
