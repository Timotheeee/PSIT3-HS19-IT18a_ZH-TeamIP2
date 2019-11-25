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

  test("verifyLoginData with wrong data", async (done) => {
    //simulate bad login attempt
    moxios.wait(() => {
      let request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          success: false, "token": ""
        }
      })
    })


    loginService.verifyLoginData('name', 'password')
    .then((result) => {
      expect(result).toBe(false);
      done();
    })
  })

  test("verifyLoginData with valid login data", async (done) => {
    //pretend the data is correct
    moxios.wait(() => {
      let request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
           success: true, "token": "2"
        }
      })
    })


    loginService.verifyLoginData('name', 'password')
    .then((result) => {
      expect(result).toBe(true);
      done();
    })
  })

  test("checkLoggedIn if token is still valid", async (done) => {
    moxios.wait(() => {
      let request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          success: true, "token": "2"
        }
      })
    })

    // no user data needed
    loginService.checkIfTokenStillValid()
    .then((result) => {
      expect(result).toBe(true);
      done();
    })
  })
})
