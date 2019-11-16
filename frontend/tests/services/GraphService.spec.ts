import {GraphService} from './../../src/services/GraphService';
import {GraphFactory} from './../../src/model/GraphFactory';
import {Graph} from './../../src/model/Graph';
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
          graph: graphString
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
          message: 'ok'
        }
      })
    })

    graphService.post(graphString)
    .then((result) => {
      expect(result).toStrictEqual('ok');
      done();
    })

  })

})
