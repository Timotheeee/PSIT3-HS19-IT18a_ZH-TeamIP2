describe('questionnaire integration test', function() {

  describe('test username', function() {

    before(function() {

      // creates empty shell for the response
      var result = {
        success: true,
        data: ""
      };

      // mocks the graph from the get request
      cy.server();
      cy.fixture("integration-test-graphs/username-graph.json").then((content => {
        result.data = JSON.stringify(content);
        cy.route('GET', '/graph', result);
      }));
    })

    it('should take placeholder username if user didnt give a name', function () {

      cy.visit(Cypress.config().baseUrl + 'welcome');
      cy.contains('Start StudentScore!').click();
      cy.get('button.possible-answer').click();
    })

    it('should take username if user gave a name', function () {
    })
  })
})
