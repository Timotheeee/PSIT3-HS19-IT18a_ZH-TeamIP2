import { Graph } from './Graph';
import { PathResult} from './PathResult';

export interface PathAnalyzerConstructor {
    new (path: PathResult[]): PathAnalyzerInterface;
}

export interface PathAnalyzerInterface {    
    calculateScore(): number;
}

export function createPathAnalyzer(ctor: PathAnalyzerConstructor, path: PathResult[]): PathAnalyzerInterface {
    return new ctor(path);
}

export class PathAnalyzer implements PathAnalyzerInterface{
    constructor(path: PathResult[]) {
        // TODO: ryan code this
    }

    calculateScore(): number {
        throw new Error("Method not implemented.");
    }

}