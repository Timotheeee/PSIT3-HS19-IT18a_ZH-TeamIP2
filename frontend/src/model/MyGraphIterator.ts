import { Graph } from "./Graph";
import { Node } from "./Graph";

export interface GraphIterator {
    currentNode: Node;
    catalogue: Graph;

    // TODO: ryan: yeah man you will probably need object types for answers ..
    answersForCurrentNode(): [String];
    choose(chosenAnswer: String): void;
    isFinalNode(): boolean;
}

export class MyGraphIterator implements GraphIterator {
    currentNode: Node;
    catalogue: Graph;

    // TODO: michael implement this class
    
    constructor(catalogue: Graph) {
        this.currentNode = catalogue.getHead();
        this.catalogue = catalogue;
    }

    getCurrentNode(): Node {
        throw new Error("Method not implemented.");
    }

    answersForCurrentNode(): [String] {
        throw new Error("Method not implemented.");
    }
    choose(chosenAnswer: String): void {
        throw new Error("Method not implemented.");
    }
    isFinalNode(): boolean {
        throw new Error("Method not implemented.");
    }


}