import {Graph} from "../Graph";
import {ScoreBasedRecommendationsGenerator} from "./ScoreBasedRecommendationsGenerator";
import {PathResult} from "../PathResult";
import {AnswerBasedRecommendationsGenerator} from "./AnswerBasedRecommendationsGenerator";
import {Result} from "../../Result";

export class RecommendationHelper {

  public static generate(graph: Graph, path: PathResult[]) : Result {
    let score: number = 0;
    let htmlTexts: string[] = [];

    let scoreBasedRecommendationsGenerator: ScoreBasedRecommendationsGenerator =
      new ScoreBasedRecommendationsGenerator(graph.scoreBasedRecommendationConfig!, path, graph);

    htmlTexts.push(...scoreBasedRecommendationsGenerator.generate());
    score = scoreBasedRecommendationsGenerator.score;

    let answerBasedRecommendationsGenerator: AnswerBasedRecommendationsGenerator =
      new AnswerBasedRecommendationsGenerator(graph.answerBasedRecommendationConfig!, path, graph);

    htmlTexts.push(...answerBasedRecommendationsGenerator.generate());

    return new Result(score, htmlTexts);
  }
}
