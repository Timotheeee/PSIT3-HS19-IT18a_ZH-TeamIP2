describe('adminpage integration test', () => {

  describe('login process', () =>  {
    it('test the login in succesfull scenario', () => {
      cy.visit(Cypress.config().baseUrl + 'adminpage');
      cy.get('input#name').type('psit').should('have.value', 'psit');
      cy.get('input#password').type('psit').should('have.value', 'psit');
      cy.contains('Submit').click();

      // test if the login toast was made
      cy.contains('Success!');
    })

    it('test the login with wrong input username', () => {
      cy.visit(Cypress.config().baseUrl + 'adminpage');
      cy.get('input#name').type('psit3').should('have.value', 'psit3');
      cy.get('input#password').type('psit').should('have.value', 'psit');
      cy.contains('Submit').click();

      // test if the error login toast was made
      cy.contains('Error with login.');
    })

    it('test the login with wrong input password', () => {
      cy.visit(Cypress.config().baseUrl + 'adminpage');
      cy.get('input#name').type('psit').should('have.value', 'psit');
      cy.get('input#password').type('psit3').should('have.value', 'psit3');
      cy.contains('Submit').click();

      // test if the error login toast was made
      cy.contains('Error with login.');
    })

    it("tests if you're still logged in after going to another page", () => {
      cy.visit(Cypress.config().baseUrl + 'adminpage');

      // login
      cy.get('input#name').type('psit').should('have.value', 'psit');
      cy.get('input#password').type('psit').should('have.value', 'psit');
      cy.contains('Submit').click();

       // go to welcome page
       cy.get('button#goToWelcomePage').click();

       // go back to admin panel
       cy .get('button#goToAdminPage').click();

      // test if you're still loggin in --> logout button and submit file button should be there
      cy.get('button#logout');
      cy.get('button#submitFile');
    })

    it("tests if logout works", () => {
      cy.visit(Cypress.config().baseUrl + 'adminpage');

      // login
      cy.get('input#name').type('psit').should('have.value', 'psit');
      cy.get('input#password').type('psit').should('have.value', 'psit');
      cy.contains('Submit').click();


      // logout
      cy.get('button#logout').click();

      // should land on the login page again
      cy.get('input#name')
      cy.get('input#password')
    })

    it("tests if still loggin in after reload", () => {
      cy.visit(Cypress.config().baseUrl + 'adminpage');

      // login
      cy.get('input#name').type('psit').should('have.value', 'psit');
      cy.get('input#password').type('psit').should('have.value', 'psit');
      cy.contains('Submit').click();


      // refresh
      cy.reload();

      // should land on the file upload page
      cy.get('button#logout');
      cy.get('button#submitFile');
    })


  })

  describe('file upload process', () => {

    it ("test if there's an error without any input file ", () => {

      cy.visit(Cypress.config().baseUrl + 'adminpage');


      // login
      cy.get('input#name').type('psit')
      cy.get('input#password').type('psit')
      cy.contains('Submit').click();

      cy.get('button#submitFile').click();

      // because there was no file added, should receive a toast with error
      cy.contains("File coulnd't be uploaded!");

    })


  })

})
