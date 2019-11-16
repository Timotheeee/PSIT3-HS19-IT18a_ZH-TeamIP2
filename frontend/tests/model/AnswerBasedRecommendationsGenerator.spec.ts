import { RecommendationsGenerator , createRecommendationsGenerator} from "../../src/model/RecommendationsGenerator";
import { AnswerBasedRecommendationsGenerator } from "../../src/model/AnswerBasedRecommendationsGenerator";
import { MyGraphIterator } from "../../src/model/MyGraphIterator";
import { GraphFactory } from "../../src/model/GraphFactory";
import { Graph } from "../../src/model/Graph";

describe("AnswerBasedRecommendationsGenerator", () => {

  let createMinimumViableGraph = function (): Graph {
      let graph = GraphFactory.createTestGraph();
      return graph;
  };

  describe("test AnswerBasedRecommendationsGenerator creation", () => {
    test("should create an AnswerBasedRecommendationsGenerator object", () => {
      //let gi: MyGraphIterator = new MyGraphIterator(new Graph());
      let graphIterator = new MyGraphIterator(createMinimumViableGraph());
      let answerBasedRecGen: AnswerBasedRecommendationsGenerator = createRecommendationsGenerator(AnswerBasedRecommendationsGenerator, "", graphIterator);
      expect(answerBasedRecGen).toBeInstanceOf(AnswerBasedRecommendationsGenerator);
    });
  });

});
