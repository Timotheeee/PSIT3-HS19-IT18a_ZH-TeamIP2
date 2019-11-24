describe('questionnaire integration test', function() {

  describe('test username', function() {

    beforeEach(function() {

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

      // start questionnaire
      cy.visit(Cypress.config().baseUrl + 'welcome');
      cy.contains('Start StudentScore!').click();

      // assert question and answer
      cy.contains('Tell me your name or I\'ll call you Leonardo DiCappuccino');
      cy.get('input[type=text][placeholder="Leonardo DiCappuccino"]').type("{enter}");
      cy.get('button.possible-answer').click();
      cy.contains('Nice to meet you Leonardo DiCappuccino');
    })

    it('should take username if given a name', function () {

      // start questionnaire
      cy.visit(Cypress.config().baseUrl + 'welcome');
      cy.contains('Start StudentScore!').click();

      // assert question and answer
      cy.contains('Tell me your name or I\'ll call you Leonardo DiCappuccino');
      cy.get('input[type=text][placeholder="Leonardo DiCappuccino"]').type("Benedict Cucumber");
      cy.get('button.possible-answer').click();
      cy.contains('Nice to meet you Benedict Cucumber');
    })
  })

  describe('test multiple choices', function() {

    beforeEach(function () {

      // creates empty shell for the response
      var result = {
        success: true,
        data: ""
      };

      // mocks the graph from the get request
      cy.server();
      cy.fixture("integration-test-graphs/choices-graph.json").then((content => {
        result.data = JSON.stringify(content);
        cy.route('GET', '/graph', result);
      }));
    })

    it('should be able to ', function () {

      // start questionnaire
      cy.visit(Cypress.config().baseUrl + 'welcome');
      cy.contains('Start StudentScore!').click();

      // choose first answer
      cy.contains('Do you go to reddit during class?');
      cy.contains('Pff... no').click();
      cy.contains('Liar');

      // choose second answer
      cy.reload();
      cy.contains('Yes').click();
      cy.contains('Stop it, get some help');

      // choose second answer
      cy.reload();
      cy.contains('What is reddit').click();
      cy.contains('Everything');
    })
  })
})

