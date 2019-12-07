import { RecommendationsGeneratorInterface , createRecommendationsGenerator} from '../../src/model/Graph/Recommendation/RecommendationsGenerator';
import { AnswerBasedRecommendationsGenerator } from '../../src/model/Graph/Recommendation/AnswerBasedRecommendationsGenerator';
import { GraphIterator } from '../../src/model/Graph/GraphIterator';
import { GraphFactory } from '../../src/model/Graph/GraphFactory';
import { Graph } from '../../src/model/Graph/Graph';

describe('AnswerBasedRecommendationsGenerator', () => {

  let createMinimumViableGraph = function (): Graph {
      let graph = GraphFactory.createTestGraph();
      return graph;
  };

  describe('test AnswerBasedRecommendationsGenerator creation', () => {
    test('should create an AnswerBasedRecommendationsGenerator object', () => {
      //let gi: MyGraphIterator = new MyGraphIterator(new Graph());
      /*let graphIterator = new GraphIterator(createMinimumViableGraph());
      let answerBasedRecGen: AnswerBasedRecommendationsGenerator = createRecommendationsGenerator(AnswerBasedRecommendationsGenerator, '', graphIterator);
      expect(answerBasedRecGen).toBeInstanceOf(AnswerBasedRecommendationsGenerator);/*
    });
  });

});
