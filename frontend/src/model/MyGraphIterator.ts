import { Graph } from "./Graph";
import { Node } from "./Node";
import { Edge, EdgeResult } from './Edge';

export interface GraphIterator {
    currentNode: Node;
    catalogue: Graph;

    // TODO: ryan: yeah man you will probably need object types for answers ..
    answersForCurrentNode(): EdgeResult[];
    choose(chosenAnswer: string): void;
    isFinalNode(): boolean;
    getPathScore(): number;
}

export class MyGraphIterator implements GraphIterator {
    currentNode: Node;
    catalogue: Graph;
    score : number;

    constructor(catalogue: Graph) {
        this.catalogue = catalogue;
        this.currentNode = catalogue.getHead();
        this.score = 0;
    }

    getCurrentNode(): Node {
        return this.currentNode;
    }

    answersForCurrentNode(): EdgeResult[] {
        let answers: EdgeResult[] = [];

        for(let outgoingEdge of this.currentNode.getEdges()) {
            answers.push(new EdgeResult(outgoingEdge.getAnswer(), outgoingEdge.getTarget().getId()));
        }

        return answers;
    }

    choose(chosenAnswer: string): void {
        // TODO: ryan throw if it doesn't move

        // TODO: ryan this should be a while
        for (let outgoingEdge of this.currentNode.getEdges()) {
            if(outgoingEdge.getTarget().getId() === chosenAnswer){
                this.currentNode = outgoingEdge.getTarget();
                this.score += outgoingEdge.getScore();
            }
        }
    }

    isFinalNode(): boolean {
        return this.currentNode.getIsFinalNode();
    }

    // TODO: ryan correctly implement this method here
    getPathScore(): number {
        if(!this.isFinalNode()){
            throw new Error("Cannot calculate score until a finalNode has been reached!");
        }

        return this.score;
    }
}
