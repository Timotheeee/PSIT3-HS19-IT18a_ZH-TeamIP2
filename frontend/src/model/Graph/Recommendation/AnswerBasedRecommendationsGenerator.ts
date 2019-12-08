import { RecommendationGeneratorInterface } from './RecommendationGeneratorInterface';
import { Graph } from '../Graph';
import { PathResult } from '../PathResult';
import { Edge } from '../Edge';


/**
 * Class responsible for generating HTML recommendation strings that are dependent on a Student's questionnaire answers.
 * Depending on the student's answers, he receives specific recommendations how to improve his habits.
 */
export class AnswerBasedRecommendationsGenerator implements RecommendationGeneratorInterface {
  private _answerBasedConfig: AnswerBasedRecommendationConfigJSON[];
  private _path: PathResult[];
  private _graph: Graph;

  constructor(answerBasedConfig: AnswerBasedRecommendationConfigJSON[], path: PathResult[], graph: Graph) {
    this._answerBasedConfig = answerBasedConfig;
    this._path = path;
    this._graph = graph;
  };


  /**
   * Generates the appropriate recommendation strings comparing multiple answer sets (groups of answers) with the
   * student's answers to check if the student's answers contain a specific answer set. If a match is found, the
   * student receives the recommendations on the result site.
   * @returns recommendations A string array containing the answer-based recommendation strings formatted in HTML.
   */
  public generate(): string[] {
    let userAnswers: string[] = this.getAnswerIds(this._path);
    let recommendationsMap = this.createRecommendationsMap(this._answerBasedConfig);
    let recommendations = this.calculateRecommendations(userAnswers, this._answerBasedConfig, recommendationsMap);

    return recommendations;
  }


  private getAnswerIds(path: PathResult[]): string[] {
    let userAnswers: string[] = [];
    for (let pathResult of path) {
      let decision: Edge | null = pathResult.decision;
      if (decision !== null) {
        userAnswers.push(decision.id);
      }
    }
    return userAnswers;
  }

  private createRecommendationsMap(recommendationsCatalogue: AnswerBasedRecommendationConfigJSON[]): Map<string[], string> {
    let map: Map<string[], string> = new Map<string[], string>();
    for (let catalogueEntry of recommendationsCatalogue) {
      map.set(catalogueEntry.answerSet,  catalogueEntry.recommendation);
    }
    return map;
  }

  private checkAnswers(answerSet: string[], userAnswers: string[]): boolean {
    for (let answerId of answerSet) {
      if (!userAnswers.includes(answerId)) {
        return false;
      }
    }
    return true;
  }

  private calculateRecommendations(userAnswers: string[], recommendationsCatalogue: AnswerBasedRecommendationConfigJSON[],
                           recommendationsMap: Map<string[], string>): string[] {
    let recommendations: string[] = [];
    for (const [key, value] of recommendationsMap.entries()) {
      if (this.checkAnswers(key, userAnswers)) {
        recommendations.push(value);
      }
    }
    return recommendations;
  }
}

export interface AnswerBasedRecommendationConfigJSON {
  answerSet: string[];
  recommendation: string;
}
