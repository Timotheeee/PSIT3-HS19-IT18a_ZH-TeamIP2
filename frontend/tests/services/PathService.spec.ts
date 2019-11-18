import {PathService} from './../../src/services/PathService';
import moxios from 'moxios';

describe("pathService", () => {
  let pathService: PathService;

  beforeEach(() => {
    pathService = new PathService();
    moxios.install();
  })

  afterEach(function () {
    moxios.uninstall()
  })

  test("test posting pathService", async (done) => {
    moxios.wait(() => {
      let request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          success: "true"
        }
      })
    })

    // no user data needed
    pathService.post([1,2,3,4])
    .then((result) => {
      expect(result).toBe("true");
      done();
    })
  })

})
