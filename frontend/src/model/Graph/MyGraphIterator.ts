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

    constructor(catalogue: Graph) {
        this._catalogue = catalogue;
        this._currentNode = catalogue.getHeadNode();    
    }

    get currentNode() : Node {
        return this._currentNode;
    }

    answersForCurrentNode(): EdgeResult[] {
        let answers: EdgeResult[] = [];

        for(let outgoingEdge of this.currentNode.getEdges()) {
            answers.push(new EdgeResult(outgoingEdge.getAnswer(), outgoingEdge.getTarget().getId()));
        }

        return answers;        
    }    

    choose(edgeId: string): void {
        // TODO: ryan throw if it doesn't move

        // TODO: ryan this should be a while
        for (let outgoingEdge of this.currentNode.getEdges()) {
            if(outgoingEdge.getTarget().getId() === edgeId){
                this._currentNode = outgoingEdge.getTarget();            
            }
        }
    }

    isFinalNode(): boolean {
        return this.currentNode.getIsFinalNode();
    }

    getPath(): PathResult[] {
        throw new Error("Method not implemented.");
    }
}
