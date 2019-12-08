import {Graph} from "../Graph";
import {ScoreBasedRecommendationsGenerator} from "./ScoreBasedRecommendationsGenerator";
import {PathResult} from "../PathResult";
import {AnswerBasedRecommendationsGenerator} from "./AnswerBasedRecommendationsGenerator";
import {Result} from "../../Result";
import {GraphTools} from "../GraphTools";

export class RecommendationHelper {

  public static generate(graph: Graph, path: PathResult[]) : Result {
    let score: number = 0;
    let htmlTexts: string[] = [];

    let scoreBasedRecommendationsGenerator: ScoreBasedRecommendationsGenerator =
      new ScoreBasedRecommendationsGenerator(graph.scoreBasedRecommendationConfig!, path, graph);

    htmlTexts.push(...scoreBasedRecommendationsGenerator.generate());

    // take Student's score from scoreBasedRecommendationsGenerator and convert it into a percentage (integer).
    let extrema = GraphTools.getExtremas(graph);
    let minScore = extrema[0];
    let maxScore = extrema[1];
    let scorePercentage = GraphTools.convertScoreToPercentage(scoreBasedRecommendationsGenerator.score, minScore, maxScore);

    let answerBasedRecommendationsGenerator: AnswerBasedRecommendationsGenerator =
      new AnswerBasedRecommendationsGenerator(graph.answerBasedRecommendationConfig!, path, graph);

    htmlTexts.push(...answerBasedRecommendationsGenerator.generate());

    return new Result(scorePercentage, htmlTexts);
  }
}
