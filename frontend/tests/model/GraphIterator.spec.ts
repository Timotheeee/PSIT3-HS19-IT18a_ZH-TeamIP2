import { GraphIterator, GraphIteratorInterface, createIterator } from '../../src/model/Graph/GraphIterator';
import { GraphFactory } from '../../src/model/Graph/GraphFactory';
import { Graph } from '../../src/model/Graph/Graph';
import { PathResult } from '../../src/model/Graph/PathResult';
import { EdgeResult } from '../../src/model/Graph/Edge';

describe('GraphIterator', () => {
    const q1Text = 'Hey thanks for testing out StudentScore! Do you wanna tell me your name? If not I\'ll just call you Bob';
    const q2Text = 'Do you play video games?';
    const q3Text = 'Ah I see you are a person of culture as well %username%. Do you play League of Legends or World of Warcraft Classic?';
    const q4Text = 'Do you exercise at least twice a week?';
    const q5Text = 'Do you get more than 7 hours of sleep every night?';

    let createMinimumViableGraph = function (): Graph {
        let graph = GraphFactory.createTestGraph();
        return graph;
    };

    let createTestGraph = function() {
        return createIterator(GraphIterator, createMinimumViableGraph());
    };

    /**
     * This simply uses the iterator by always choosing the first edge that is
     * returned from answersForCurrentNode().
     * @param iterator
     */
    let traverseToFinalNode = function(iterator: GraphIteratorInterface) {
        while(!iterator.isFinalNode()) {
            iterator.choose(iterator.answersForCurrentNode()[0].edgeId);
        }
    }

    describe('constructor', () => {
        it('should return an object of type Graph when given a correct graph object', () => {
            const iterator: GraphIteratorInterface = createTestGraph();

            expect(iterator).toBeInstanceOf(GraphIterator);
        });

        it('current node should be a head node', () => {
            const iterator: GraphIteratorInterface = createTestGraph();

            expect(iterator.currentNode.isHead).toBe(true);
        });
    });

    describe('isFinalNode()', () => {
        it('should return false if called on head', () => {
            const iterator: GraphIteratorInterface = createTestGraph();

            expect(iterator.isFinalNode()).toBe(false);
        });

        it('should still return false after making one step', () => {
            const iterator: GraphIteratorInterface = createTestGraph();

            iterator.choose(iterator.answersForCurrentNode()[0].edgeId);
            expect(iterator.isFinalNode()).toBe(false);
        });

        it('should return true if currentNode points to a final node', () => {
            const iterator: GraphIteratorInterface = createTestGraph();
            
            traverseToFinalNode(iterator);

            expect(iterator.isFinalNode()).toBe(true);
        });
    });

    describe('getPath()', () => {
        it('should return an empty array if called on an unmodified object.', () => {
            const iterator: GraphIteratorInterface = createTestGraph();

            const actual = iterator.getPath();

            // TODO: figure out how to check for this type
            expect(actual[0]).toBeInstanceOf(PathResult);
            expect(actual.length).toBe(0);
        });

        it('should return an array of 2 results if two answers were chosen', () => {
            const iterator: GraphIteratorInterface = createTestGraph();
            iterator.choose(iterator.answersForCurrentNode()[0].edgeId);
            iterator.choose(iterator.answersForCurrentNode()[0].edgeId);
            
            const actual = iterator.getPath();

            expect(actual.length).toBe(2);
            expect(actual[0]).toBeInstanceOf(PathResult);
        });
    });

    describe('choose()', () => {
        it('should change the currentNode to a different node', () => {
            const iterator: GraphIteratorInterface = createTestGraph();

            const startingNodeId: string = iterator.currentNode.id;
            iterator.choose(iterator.answersForCurrentNode()[0].edgeId);
            const newNodeId: string = iterator.currentNode.id;

            expect(startingNodeId).not.toEqual(newNodeId);
        });

        it('should throw if called on inviable edgeId', () => {
            const iterator: GraphIteratorInterface = createTestGraph();

            const illegalEdgeId = 'e¿3999';
            expect(() => { 
                iterator.choose(illegalEdgeId);
            }).toThrow();
        });
    });

    describe('answersForCurrentNode()', () => {
        it('should return an array of type EdgeResult if called on any node that isn\nt a final node', () => {
            const iterator: GraphIteratorInterface = createTestGraph();
            // try on first node
            expect(iterator.answersForCurrentNode()[0]).toBeInstanceOf(EdgeResult);
            // try on third node
            iterator.choose(iterator.answersForCurrentNode()[0].edgeId);
            iterator.choose(iterator.answersForCurrentNode()[0].edgeId);
            expect(iterator.answersForCurrentNode()[0]).toBeInstanceOf(EdgeResult);
        });
    });

    describe('composite test gaming graph: left path', () =>{
        it('should folllow the path and eventually arrive at the final node.', () => {
            const iterator: GraphIteratorInterface = createTestGraph();
            
            expect(iterator.currentNode.text).toBe(q1Text);
            iterator.choose('e1');

            expect(iterator.currentNode.text).toBe(q2Text);
            iterator.choose('e2');

            expect(iterator.currentNode.text).toBe(q3Text);
            iterator.choose('e4');

            expect(iterator.currentNode.text).toBe(q5Text);
            iterator.choose('e9');

            expect(iterator.currentNode.isFinalNode).toBe(true);
        });
    });

    describe('composite test non-gaming path: right path', () => {
        it('should follow the path and and eventually arrive at the final node', () => {
            const iterator: GraphIteratorInterface = createTestGraph();
            expect(iterator.currentNode.text).toBe(q2Text);

            iterator.choose('e1');

            expect(iterator.currentNode.text).toBe(q3Text);
            iterator.choose('e3');

            expect(iterator.currentNode.text).toBe(q5Text);
            iterator.choose('e6'); 

            expect(iterator.currentNode.text).toBe(q5Text);
            iterator.choose('e8');

            expect(iterator.currentNode.isFinalNode).toBe(true);
        });
    });
});
