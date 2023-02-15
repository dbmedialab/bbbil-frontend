describe('First Test', () => {
  it('Does not do much!', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#counter').should('contain', '0')
    cy.get('#plusButton').click()
    cy.get('#counter').should('contain', '1')
  })
})
