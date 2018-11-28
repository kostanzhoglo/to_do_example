describe('Input form', () => {
  beforeEach(() => {
    cy.visit('/')
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
})
