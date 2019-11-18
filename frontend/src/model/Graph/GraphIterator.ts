import { Graph } from "./Graph";
import { Node } from "./Node";
import { Edge, EdgeResult } from './Edge';
import { PathResult } from "./PathResult";
import { OutgoingMessage } from "http";

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
        const outoingEdges: Edge[] = this.currentNode.edges;
        let i: number = 0;

        while(i < outoingEdges.length && outoingEdges[i].id != edgeId ) {
            i++;
        }

        /**
         * if edgeId is one of the connected edges set it as currentNode -> move
         * Otherwise throw which means edgeId was invalid
         *  */ 
        if(i < outoingEdges.length) {            
            let newCurrentNode = this._catalogue.findNode(outoingEdges[i].targetId)!;
            this._currentNode = newCurrentNode;
        } else {
            throw Error(`edgeId: ${edgeId} could not be found on current node!`)
        }
    }

    isFinalNode(): boolean {
        return this.currentNode.isFinalNode;
    }

    getPath(): PathResult[] {
        throw new Error("Method not implemented.");
    }
}
