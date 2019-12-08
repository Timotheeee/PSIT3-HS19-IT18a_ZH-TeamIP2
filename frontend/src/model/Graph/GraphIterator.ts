import {Graph} from "./Graph";
import {Node} from "./Node";
import {Edge, EdgeResult} from './Edge';
import {PathResult} from "./PathResult";

export interface GraphIteratorConstructor {
  new(catalogue: Graph): GraphIteratorInterface;
}

/**
 * Objects that can iterate by choosing answers.
 * It is assumed that the data structured is similar to a graph data structure but not required!
 */
export interface GraphIteratorInterface {
  answersForCurrentNode(): EdgeResult[];

  choose(chosenAnswer: string): void;

  isFinalNode(): boolean;

  getPath(): PathResult[];

  /**
   * As far as I, currently, know this is the best way to define get/set properties in an interface.
   * see this post on stackoverflow: https://stackoverflow.com/questions/12838248/is-it-possible-to-use-getters-setters-in-interface-definition
   * Couldn't find anything in the ts lang docs.
   */
  currentNode: Node;
}

export function createIterator(ctor: GraphIteratorConstructor, catalogue: Graph): GraphIteratorInterface {
  return new ctor(catalogue);
}

/**
 * Graph implementation of GraphIteratorInterface
 */
export class GraphIterator implements GraphIteratorInterface {
  private _currentNode: Node;
  private readonly _catalogue: Graph;
  private _path: PathResult[] = [];

  constructor(catalogue: Graph) {
    this._catalogue = catalogue;
    this._currentNode = catalogue.headNode;
  }

  get currentNode(): Node {
    return this._currentNode;
  }

  /**
   * Returns the edges that can be reached with 1 step from the current node.
   */
  public answersForCurrentNode(): EdgeResult[] {
    let answers: EdgeResult[] = [];

    for (let outgoingEdge of this.currentNode.edges) {
      answers.push(new EdgeResult(outgoingEdge.id, outgoingEdge.answer));
    }

    return answers;
  }

  /**
   * Perform a single step on the graph to a neighbour.
   * The chosen edge will become the new current node.
   * @param edgeId
   */
  public choose(edgeId: string): void {
    const outgoingEdges: Edge[] = this.currentNode.edges;
    let i: number = 0;

    while (i < outgoingEdges.length && outgoingEdges[i].id != edgeId && edgeId != undefined) {
      i++;
    }

    /**
     * if edgeId is one of the connected edges set it as currentNode -> move
     * Otherwise throw which means edgeId was invalid
     *  */
    if (i < outgoingEdges.length) {
      let newCurrentNode = this._catalogue.findNode(outgoingEdges[i].targetId)!;

      / * save current move to path */
      this._path.push(new PathResult(this.currentNode, outgoingEdges[i]));

      this._currentNode = newCurrentNode;
    } else {
      throw Error(`edgeId: ${edgeId} could not be found on current node!`)
    }
  }

  /**
   * returns whether current node is of attribute finalNode.
   */
  isFinalNode(): boolean {
    return this.currentNode.isFinalNode;
  }

  /**
   * returns PathResult[] containing all the steps that have been taken by calling choose.
   * This accurately describes the path that was taken.
   */
  getPath(): PathResult[] {
    return this._path;
  }
}
