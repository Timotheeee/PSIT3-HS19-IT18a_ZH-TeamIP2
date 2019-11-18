import { RecommendationsGeneratorInterface } from "./RecommendationsGenerator";
import { GraphIterator } from "../GraphIterator";
import { PathResult } from '../PathResult';
import { Graph } from "../Graph";

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

    return [""];
  }

  public getScore(): number {
    throw new Error('not yet implemented');
  }
}
