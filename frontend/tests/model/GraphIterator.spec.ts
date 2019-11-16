import { GraphIterator, GraphIteratorInterface, createIterator } from '../../src/model/Graph/MyGraphIterator';
import { GraphFactory } from '../../src/model/Graph/GraphFactory';
import { Graph } from '../../src/model/Graph/Graph';
import { PathResult } from '../../src/model/Graph/PathResult';

describe('MyGraphIterator', () => {
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

            expect(iterator.currentNode.getIsHead()).toBe(true);
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
            //expect(actual).toBeInstanceOf(PathResult[]);
            expect(actual.length).toBe(0);
        });
    });

    // TODO: ryan. graphIterator.choose arguments needs to be answerId, not targetNodeId
    // The problem being that the current model does not support mutliple edges from node a to node b.
    // It cannot keep the score, but simply knows which nodes were traversed.
    // I will refactor this as soon as I can find the time.

    describe('composite test gaming graph: left path', () =>{
        it('should folllow the path and eventually arrive at the final node.', () => {
            const iterator: GraphIteratorInterface = createTestGraph();
            
            expect(iterator.currentNode.getTitle()).toBe(q1Text);
            iterator.choose('e1');

            expect(iterator.currentNode.getTitle()).toBe(q2Text);
            iterator.choose('e2');

            expect(iterator.currentNode.getTitle()).toBe(q3Text);
            iterator.choose('e4');

            expect(iterator.currentNode.getTitle()).toBe(q5Text);
            iterator.choose('e9');

            expect(iterator.currentNode.getIsFinalNode()).toBe(true);
        });
    });

    describe('composite test non-gaming path: right path', () => {
        it('should follow the path and and eventually arrive at the final node', () => {
            const iterator: GraphIteratorInterface = createTestGraph();
            expect(iterator.currentNode.getTitle()).toBe(q2Text);

            iterator.choose('e1');

            expect(iterator.currentNode.getTitle()).toBe(q3Text);
            iterator.choose('e3'); // TODO: choose that you play league

            expect(iterator.currentNode.getTitle()).toBe(q5Text);
            iterator.choose('e6'); // TODO: choose that you don't like to sleep

            expect(iterator.currentNode.getTitle()).toBe(q5Text);
            iterator.choose('e8'); // TODO: choose that you don't like to sleep

            expect(iterator.currentNode.getIsFinalNode()).toBe(true);
        });
    });
});
