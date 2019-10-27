import { Graph } from "./Graph";
import { Node } from "./Node";
import { Edge } from './Edge';

export interface GraphIterator {
    currentNode: Node;
    catalogue: Graph;

    // TODO: ryan: yeah man you will probably need object types for answers ..
    answersForCurrentNode(): string[];
    choose(chosenAnswer: string): void;
    isFinalNode(): boolean;
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

    answersForCurrentNode(): string[] {
        let answers: string[] = [];

        for(let outgoingEdge of this.currentNode.getEdges()) {
            answers.push(outgoingEdge.getAnswer());
        }

        return answers;        
    }

    choose(chosenAnswer: string): void {
        // TODO: ryan throw if it doesn't move

        // TODO: ryan this should be a while
        for (let outgoingEdge of this.currentNode.getEdges()) {
            if(outgoingEdge.getTarget().getId() === chosenAnswer){
                this.currentNode = outgoingEdge.getTarget();
                this.score += outgoingEdge.getWeight();
            }
        }
    }

    isFinalNode(): boolean {
        return false;
    }
}
