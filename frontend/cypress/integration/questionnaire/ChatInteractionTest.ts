describe('questionnaire integration test', function() {

  describe('test username', function() {

    it('should take placeholder username if user didnt give a name', function () {

      const usernameGraph = new File(['data to upload'], cy.fixture("integration-test-graphs/username-graph.json"));

      cy.fixture("integration-test-graphs/username-graph.json").then((content => {
        cy.request('POST', 'localhost:3000/graph', content);
      }));

      cy.visit(Cypress.config().baseUrl + 'welcome');
      cy.contains('Start StudentScore!').click();
    })

    it('should take username if user gave a name', function () {
    })
  })
})
