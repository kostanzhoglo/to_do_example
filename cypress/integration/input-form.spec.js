describe('Input form', () => {
  beforeEach(() => {
    // cy.visit('/')
    cy.seedAndVisit([])
  })

  it('focuses input on load', () => {
    cy.focused()
      .should('have.class', 'new-todo')
  })

  it('accepts input', () => {
    const typedText = 'Buy taco ingredients'

    cy.get('.new-todo')
      .type(typedText)
      .should('have.value', typedText)
  })

  context('Form submission', () => {
    beforeEach(() => {
      cy.server() // starts up the Cypress server, so you can stub responses with known data, allowing you to test functionality even if the back-end isn't built yet.
    })
    it('Adds a new todo on submit', () => {
      const itemText = 'Buy eggs'
      // cy.route DEFINES the Request you want to handle. The 3rd parameter is a predefined response you want to SEND Back to your app, as if you had successfully reached a real, working API. Don't need 3rd param if you're hitting a real backend.
      cy.route('POST', '/api/todos', {
        name: itemText,
        id: 1,
        isComplete: false
      })
      cy.get('.new-todo')
        .type(itemText)  // hmmmmm
        .type('{enter}')
        .should('have.value', '')
      cy.get('.todo-list li')
        .should('have.length', 1)
        .and('contain', itemText)
    })
    it('Shows an error message on a failed submission', () => {
      cy.route({
        url: '/api/todos',
        method: 'POST',
        status: 500,
        response: {}
      })

      cy.get('.new-todo')
        .type('test{enter}')

      cy.get('.todo-list li')
        .should('not.exist')

      cy.get('.error')
        .should('be.visible')
    })
  })
})
