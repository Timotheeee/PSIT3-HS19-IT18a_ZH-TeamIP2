import { Graph } from "./Graph";
import { Node } from "./Node";
import { Edge, EdgeResult } from './Edge';
import { PathResult } from "./PathResult";

export interface GraphIteratorConstructor {
    new (catalogue: Graph): GraphIteratorInterface;
}

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

export class GraphIterator implements GraphIteratorInterface {
    private _currentNode: Node;
    private readonly _catalogue: Graph;
    private _path: PathResult[] = [];

    constructor(catalogue: Graph) {
        this._catalogue = catalogue;
        this._currentNode = catalogue.headNode;
    }

    get currentNode() : Node {
        return this._currentNode;
    }

    answersForCurrentNode(): EdgeResult[] {
        let answers: EdgeResult[] = [];

        for(let outgoingEdge of this.currentNode.edges) {
            answers.push(new EdgeResult(outgoingEdge.id, outgoingEdge.answer));
        }

        return answers;
    }

    choose(edgeId: string): void {
        const outgoingEdges: Edge[] = this.currentNode.edges;
        let i: number = 0;

        while(i < outgoingEdges.length && outgoingEdges[i].id != edgeId && edgeId != undefined) {
            i++;
        }

        /**
         * if edgeId is one of the connected edges set it as currentNode -> move
         * Otherwise throw which means edgeId was invalid
<<<<<<< HEAD
         *  */
        if(i < outgoingEdges.length) {
            let newCurrentNode = this._catalogue.findNode(outgoingEdges[i].targetId)!;
<<<<<<< HEAD
=======
         *  */ 
        if(i < outoingEdges.length) {            
            let newCurrentNode = this._catalogue.findNode(outoingEdges[i].targetId)!;
>>>>>>> prepare unit tests for michael to continue on ...
=======

          / * save current move to path */
          this._path.push(new PathResult(this.currentNode, outgoingEdges[i]));

>>>>>>> -scoreBasedConfig and answerBasedConfig json parsing does now work
            this._currentNode = newCurrentNode;
        } else {
            throw Error(`edgeId: ${edgeId} could not be found on current node!`)
        }
    }

    isFinalNode(): boolean {
        return this.currentNode.isFinalNode;
    }

    getPath(): PathResult[] {
        return this._path;
    }
}
