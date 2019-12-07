import { RecommendationGeneratorInterface } from './RecommendationGeneratorInterface';
import { Graph } from '../Graph';
import { PathResult } from '../PathResult';
import { Edge } from '../Edge';

export class AnswerBasedRecommendationsGenerator implements RecommendationGeneratorInterface {
  private _config: AnswerBasedRecommendationConfigJSON[];
  private _path: PathResult[];
  private _graph: Graph;

  constructor(config: AnswerBasedRecommendationConfigJSON[], path: PathResult[], graph: Graph) {
    this._path = path;
    this._graph = graph;
    this._config = config;
  };


  public generate(): string[] {
    let userAnswers: string[] = this.getAnswerIds(this._path);
    let recommendationsMap = this.createRecommendationsMap(this._config);
    let recommendations = this.calculateRecommendations(userAnswers, this._config, recommendationsMap);

    return recommendations;
  }


  getAnswerIds(path: PathResult[]): string[] {
    let userAnswers: string[] = [];
    for (let pathResult of path) {
      let decision: Edge | null = pathResult.decision;
      if (decision !== null) {
        userAnswers.push(decision.id);
      }
    }
    return userAnswers;
  }

  createRecommendationsMap(recommendationsCatalogue: AnswerBasedRecommendationConfigJSON[]): Map<string[], string> {
    let map: Map<string[], string> = new Map<string[], string>();
    for (let catalogueEntry of recommendationsCatalogue) {
      map.set(catalogueEntry.answerSet,  catalogueEntry.recommendation);
    }
    return map;
  }

  checkAnswers(answerSet: string[], userAnswers: string[]): boolean {
    for (let answerId of answerSet) {
      if (!userAnswers.includes(answerId)) {
        return false;
      }
    }
    return true;
  }

  calculateRecommendations(userAnswers: string[], recommendationsCatalogue: AnswerBasedRecommendationConfigJSON[],
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
