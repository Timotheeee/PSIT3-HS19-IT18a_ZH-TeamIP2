describe('adminpage integration test', () => {
  it('test the login in succesfull scenario', () => {
    cy.server();
    cy.visit(Cypress.config().baseUrl + 'adminpage');
    cy.get('input#name').type('psit').should('have.value', 'psit');
    cy.get('input#password').type('psit').should('have.value', 'psit');
    cy.contains('Submit').click();

    // test if the login toast was made
    cy.contains('Success!');
  })

  it('test the login with wrong input username', () => {
    cy.server();
    cy.visit(Cypress.config().baseUrl + 'adminpage');
    cy.get('input#name').type('psit3').should('have.value', 'psit3');
    cy.get('input#password').type('psit').should('have.value', 'psit');
    cy.contains('Submit').click();

    // test if the error login toast was made
    cy.contains('Error with login.');
  })

  it('test the login with wrong input password', () => {
    cy.server();
    cy.visit(Cypress.config().baseUrl + 'adminpage');
    cy.get('input#name').type('psit').should('have.value', 'psit');
    cy.get('input#password').type('psit3').should('have.value', 'psit3');
    cy.contains('Submit').click();

    // test if the error login toast was made
    cy.contains('Error with login.');
  })
});
