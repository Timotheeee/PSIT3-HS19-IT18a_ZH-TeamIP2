import { Edge } from './Edge';

export class PathResult {
    readonly _decision: Edge;

    constructor(node: Node, decision: Edge|null) {        
        this._decision = decision;
    }

    get decision(): Edge { return this._decision; }
}