import {LoginService} from './../../src/services/LoginService';
import moxios from 'moxios';

describe("loginService", () => {
  let loginService: LoginService;

  beforeEach(() => {
    loginService = new LoginService();
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
          token: '1234'
        }
      })
    })

    // no user data needed
    loginService.post({})
    .then((result) => {
      expect(result).toBe('1234');
      done();
    })
  })

  test("post if token is not valid anymore", async (done) => {
    moxios.wait(() => {
      let request = moxios.requests.mostRecent()
      request.respondWith({
        status: 400,
        response: {
          token: ''
        }
      })
    })

    // no user data needed
    loginService.post({})
    .then((result) => {
    })
    .catch(error => {
      expect(error).toBeTruthy();
      done();
    })
  })
})
