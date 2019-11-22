import {GraphService} from './../../src/services/GraphService';
import {GraphFactory} from './../../src/model/Graph/GraphFactory';
import {Graph} from './../../src/model/Graph/Graph';
import moxios from 'moxios';

describe("graphService", () => {
  let testGraph: Graph;
  let graphService: GraphService;
  let graphString: string;

  beforeEach(() => {
    graphService = new GraphService();
    graphString = GraphFactory.STATIC_JSON_STR_1;
    testGraph = GraphFactory.createTestGraph();
    moxios.install();
  })

  afterEach(function () {
    moxios.uninstall()
  })

  test("getGraph function", async (done) => {
    moxios.wait(() => {
      let request = moxios.requests.mostRecent()
      request.respondWith({        
        status: 200,
        response: {
          success: true,
          data: graphString
        }
      })
    })

    graphService.get()
    .then((result) => {
      expect(result).toStrictEqual(testGraph);
        done();
    })

  })

  test("post function", async (done) => {

    moxios.wait(() => {
      let request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          success: true,
          data: ''
        }
      })
    })

    graphService.post(graphString)
    .then((result) => {
      expect(result).toBe(true);
      done();
    })

  })

})
