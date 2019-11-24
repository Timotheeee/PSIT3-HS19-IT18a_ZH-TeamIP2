<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { RecommendationsGeneratorInterface } from './RecommendationsGenerator';
import { GraphIterator } from '../GraphIterator';
import { PathResult } from '../PathResult';
import { Graph } from '../Graph';
import { GraphTools } from '../GraphTools';
import { Edge } from '../Edge';

export class ScoreBasedRecommendationsGenerator implements RecommendationsGeneratorInterface {
  private _json: string;
  private _path : PathResult[];
  private _graph : Graph;
  private _score : number = 0;

  constructor(json: string, path: PathResult[], graph: Graph) {
    this._json = json;
    this._path = path;
    this._graph = graph;
  }

  get score(): number { return this._score; }

  public generate(): string[] {
    this._score = this.calculateScore();

    let scoreBasedRecommendations: ScoreBasedRecommendationsJSON = this.parseFromJSON(this._json);
    let numberOfPartitions: number = scoreBasedRecommendations.numberOfPartitions;
    let recommendationsCatalogue: string[] = scoreBasedRecommendations.recommendations;
    let recommendations: string[] = this.calculateRecommendations(numberOfPartitions, recommendationsCatalogue, this._score);

    return recommendations;
  }

  private calculateScore(): number {
    let score: number = 0;
    if (this._path.length < 1) {
      throw new Error("path is empty.");
    }
    for (let pathResult of this._path) {
      let decision: Edge | null = pathResult.decision;
      if (decision !== null) {
        score += decision.weight;
      }
    }
    return score;
  }

  parseFromJSON(json: string): ScoreBasedRecommendationsJSON {
    return JSON.parse(json);
  }

  /*
   * Choose the appropriate score parition according to the student's score and
   * return the respective recommendation string.
   */
  calculateRecommendations(numberOfPartitions: number, recommendationsCatalogue: string[], userScore: number): string[] {
    let extrema: number[] = GraphTools.getExtremas(this._graph);
    let minScore = extrema[0];
    let maxScore = extrema[1];
    let scoreRange = maxScore - minScore;
    let partitionSize = scoreRange / numberOfPartitions;
    let currentLowerPartitionBoundary: number = minScore;
    let currentUpperPartitionBoundary: number = currentLowerPartitionBoundary + partitionSize;
    let partitionCounter: number = 0;
    let recommendations: string[] = [];

    while (partitionCounter < numberOfPartitions) {
      if (userScore <= currentUpperPartitionBoundary) {
        recommendations.push(recommendationsCatalogue[partitionCounter]);
        break;
      }
      currentLowerPartitionBoundary = currentUpperPartitionBoundary;
      currentUpperPartitionBoundary += partitionSize;
      partitionCounter += 1;
    }
    return recommendations;
  }
}

export interface ScoreBasedRecommendationsJSON {
  numberOfPartitions: number;
  recommendations: string[];
}
=======
import { RecommendationsGenerator } from "./RecommendationsGenerator";
import { MyGraphIterator } from "./MyGraphIterator";
=======
import { RecommendationsGeneratorInterface } from "./RecommendationsGenerator";
import { GraphIterator } from "../GraphIterator";
import { PathResult } from '../PathResult';
import { Graph } from "../Graph";
>>>>>>> prepare unit tests for michael to continue on ...
=======
import { RecommendationsGeneratorInterface } from './RecommendationsGenerator';
import { GraphIterator } from '../GraphIterator';
import { PathResult } from '../PathResult';
import { Graph } from '../Graph';
import { GraphTools } from '../GraphTools';
import { Edge } from '../Edge';
>>>>>>> Implement RecommendationsGenerator classes

export class ScoreBasedRecommendationsGenerator implements RecommendationsGeneratorInterface {
  private _json: string;
  private _path : PathResult[];
  private _graph : Graph;

  constructor(json: string, path: PathResult[], graph: Graph) {
    this._json = json;
    this._path = path;
    this._graph = graph;
  };

  public generate(): string[] {
    // implement generate function
    let scoreBasedRecommendations: ScoreBasedRecommendationsJSON = this.createScoreBasedRecommendationsFromJSON(this._json);
    let numberOfPartitions: number = scoreBasedRecommendations.numberOfPartitions;
    let recommendationsCatalogue: string[] = scoreBasedRecommendations.recommendations;
    let userScore: number = this.calculateScore(this._path);
    let recommendations: string[] = this.calculateRecommendations(numberOfPartitions, recommendationsCatalogue, userScore);
    return recommendations;
  }

  calculateScore(path: PathResult[]): number {
    let score: number = 0;
    if (path.length < 1) {
      throw new Error("path is empty.");
    }
    for (let pathResult of path) {
      let decision: Edge | null = pathResult.decision;
      if (decision !== null) {
        score += decision.weight;
      }
    }
    return score;
  }

  createScoreBasedRecommendationsFromJSON(json: string): ScoreBasedRecommendationsJSON {
    let scoreBasedRecommendations = JSON.parse(json);
    return scoreBasedRecommendations;
  }

  /*
   * Choose the appropriate score parition according to the student's score and
   * return the respective recommendation string.
   */
  calculateRecommendations(numberOfPartitions: number, recommendationsCatalogue: string[], userScore: number): string[] {
    let extrema: number[] = GraphTools.getExtremas(this._graph);
    let minScore = extrema[0];
    let maxScore = extrema[1];
    let scoreRange = maxScore - minScore;
    let partitionSize = scoreRange / numberOfPartitions;
    let currentLowerPartitionBoundary: number = minScore;
    let currentUpperPartitionBoundary: number = currentLowerPartitionBoundary + partitionSize;
    let partitionCounter: number = 0;
    let recommendations: string[] = [];

    while (partitionCounter < numberOfPartitions) {
      if (userScore <= currentUpperPartitionBoundary) {
        recommendations.push(recommendationsCatalogue[partitionCounter]);
        break;
      }
      currentLowerPartitionBoundary = currentUpperPartitionBoundary;
      currentUpperPartitionBoundary += partitionSize;
      partitionCounter += 1;
    }
    return recommendations;
  }

  public getScore(): number {
    return this.calculateScore(this._path);
  }
}
<<<<<<< HEAD
>>>>>>> Change stuff
=======

export interface ScoreBasedRecommendationsJSON {
  numberOfPartitions: number;
  recommendations: string[];
}
>>>>>>> Implement RecommendationsGenerator classes
