import { Edge } from './Edge';

export class PathResult {
    readonly _decision: Edge;

    constructor(node: Node, decision: Edge|null) {        
        this._decision = decision;
    }

<<<<<<< HEAD
    get node(): Node { return this._node;  }
    get decision(): Edge|null { return this._decision; }

}
=======
    get decision(): Edge { return this._decision; }
}
>>>>>>> -change recommendation interface to use PathResult over GraphIterator
