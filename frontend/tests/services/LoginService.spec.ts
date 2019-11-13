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

  test("verifyLoginData", async (done) => {
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
    loginService.verifyLoginData('name', 'password')
    .then((result) => {
    })
    .catch(error => {
      expect(error).toBeTruthy();
      done();
    })
  })

  test("verifyLoginData if token is still valid", async (done) => {
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
    loginService.verifyLoginData('name', 'passowrd')
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
          token: '1234'
        }
      })
    })

    // no user data needed
    loginService.checkLoggedIn()
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
          token: '1234'
        }
      })
    })

    // no user data needed
    loginService.checkLoggedIn()
    .then((result) => {
      expect(result).toBe(true);
      done();
    })
  })
})
