import { MyGraphIterator } from "../../src/model/MyGraphIterator";
import { GraphFactory } from "../../src/model/GraphFactory";
import { Graph } from "../../src/model/Graph";

describe("MyGraphIterator", () => {        
    const q1Text = "Do you play video games?";
    const q2Text = "Do you play League of Legends or World of Warcraft Classic?";
    const q3Text = "Do you exercise at least twice a week?";
    const q4Text = "Do you get more than 7 hours of sleep every night?";

    let createMinimumViableGraph = function (): Graph {        
        let graph = GraphFactory.createTestGraph();
        return graph;
    };

    // TODO: ryan. graphIterator.choose arguments needs to be answerId, not targetNodeId
    // The problem being that the current model does not support mutliple edges from node a to node b.
    // It cannot keep the score, but simply knows which nodes were traversed.
    // I will refactor this as soon as I can find the time.

    describe("test gaming graph: left path", () =>{
        it("should folllow the path and eventually arrive at the final node.", () => {
            let graphIterator = new MyGraphIterator(createMinimumViableGraph());            
            expect(graphIterator.getCurrentNode().getTitle()).toBe(q1Text);

            graphIterator.choose("q2");
            
            expect(graphIterator.getCurrentNode().getTitle()).toBe(q2Text);
            graphIterator.choose("q4");

            expect(graphIterator.getCurrentNode().getTitle()).toBe(q4Text);    
            graphIterator.choose("fn1");
            
            expect(graphIterator.getCurrentNode().getIsFinalNode()).toBe(true);                        
        });

        it("should create a very low score", function(){
            let graphIterator = new MyGraphIterator(createMinimumViableGraph());
            graphIterator.choose('q2');
            graphIterator.choose('q4');
            graphIterator.choose('fn1');
            expect(graphIterator.getPathScore()).toBe(-1510);
        });
    });

    describe("test non-gaming path: right path", () => {
        it("should follow the path and and eventually arrive at the final node", () => {
            let graphIterator = new MyGraphIterator(createMinimumViableGraph());            
            expect(graphIterator.getCurrentNode().getTitle()).toBe(q1Text);

            graphIterator.choose("q3");
            
            expect(graphIterator.getCurrentNode().getTitle()).toBe(q2Text);
            graphIterator.choose("q4"); // TODO: choose that you play league

            expect(graphIterator.getCurrentNode().getTitle()).toBe(q4Text);    
            graphIterator.choose("fn1"); // TODO: choose that you don't like to sleep
            
            expect(graphIterator.getCurrentNode().getIsFinalNode()).toBe(true);             
        });

        it("should have a decent score", function(){
            let graphIterator = new MyGraphIterator(createMinimumViableGraph());
            graphIterator.choose('q3');
            graphIterator.choose('q4'); // TODO: choose no to work out
            graphIterator.choose('fn1');
            expect(graphIterator.getPathScore()).toBe(510);
        });
    });

});