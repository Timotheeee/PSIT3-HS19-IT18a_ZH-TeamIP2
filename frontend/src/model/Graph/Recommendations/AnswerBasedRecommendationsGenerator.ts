import { RecommendationsGeneratorInterface } from './RecommendationsGenerator';
import { GraphIterator } from '../GraphIterator';
import { Graph } from '../Graph';
import { PathResult } from '../PathResult';

export class AnswerBasedRecommendationsGenerator implements RecommendationsGeneratorInterface {
  private _json: string;
  private _path: PathResult[];
  private _graph: Graph;

  constructor(json: string, path: PathResult[], graph: Graph) {
    this._json = json;
    this._path = path;
    this._graph = graph;
  };

  public generate(): string[] {
    // implement generate function

    return [""];
  }
}
