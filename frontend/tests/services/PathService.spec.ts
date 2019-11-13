import {PathService} from './../../src/services/PathService';
import moxios from 'moxios';

describe("graphService", () => {
  let pathService: PathService;

  beforeEach(() => {
    pathService = new PathService();
    moxios.install();
  })

  afterEach(function () {
    moxios.uninstall()
  })

  test("post if token is still valid", async (done) => {
    moxios.wait(() => {
      let request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          message: 'ok'
        }
      })
    })

    // no user data needed
    pathService.post([1,2,3,4])
    .then((result) => {
      expect(result).toBe('ok');
      done();
    })
  })

})
