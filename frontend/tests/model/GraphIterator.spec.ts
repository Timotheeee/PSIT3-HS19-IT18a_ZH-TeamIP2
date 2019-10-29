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

    describe("test gaming graph: left path", () =>{
        it("should folllow the path and eventually arrive at the final node.", () => {
            let graphIterator = new MyGraphIterator(createMinimumViableGraph());            
            expect(graphIterator.getCurrentNode().getTitle()).toBe(q1Text);

            graphIterator.choose("q2");
            
            expect(graphIterator.getCurrentNode().getTitle()).toBe(q2Text);
            graphIterator.choose("q4");

            expect(graphIterator.getCurrentNode().getTitle()).toBe(q4Text);
            graphIterator.choose("fn");

            expect(graphIterator.getCurrentNode().getIsFinalNode()).toBe(true);                        
        });
    });

    /*describe("test non-gaming path: right path", () => {
        it("should follow the path and and eventually arrive at the final node", () => {
            //let graphIterator = new MyGraphIterator(createMinimumViableGraph());
            //graphIterator.getCurrentNode().getTitle().toBe(q1Text);
            

        });
    });*/

});