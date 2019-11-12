import { mount, shallowMount, Wrapper} from '@vue/test-utils'
import Vue from 'vue';
import TheAdminPage from './../../src/components/TheAdminPage.vue';
import LoginBox from './../../src/components/LoginBox.vue';
import UploadBox from './../../src/components/UploadBox.vue';


describe("adminsite", () => {
  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    wrapper = shallowMount(TheAdminPage)
  })


  describe("is theAdminPage rendered correctly", () => {
    it("has to contain a header", () => {
      expect(wrapper.html().includes("the-header")).toBeTruthy();
    })

    it("has to contain a button to go back to welcome page", () => {
      expect(wrapper.contains('button#goToWelcomePage')).toBeTruthy();
    })

    it("has to contain a loginbox if not loggedin", () => {
      expect(wrapper.html().includes("login-box")).toBeTruthy();
    })

    it("has to contain a uploadbox if loggedin", () => {
      wrapper.setData({
        loggedin: true
      })
      expect(wrapper.html().includes("upload-box")).toBeTruthy();
    })

    it("has to contain a loginbox if loggedout", () => {

      // loggin
      wrapper.setData({
        loggedin: true
      })

      // log out
      wrapper.setData({
        loggedin: false
      })
      expect(wrapper.html().includes("login-box")).toBeTruthy();

    })
  })

  describe("functions of adminpage", () => {
    test("is updateAnswer method called", () => {
      let updateViewToUploadStub = jest.fn();
      wrapper.setMethods({ updateAnswer: updateViewToUploadStub()})

      wrapper.find(LoginBox).vm.$emit('loginOK');
      expect(updateViewToUploadStub.mock.calls.length).toBe(1);
    })

    test("is logout method called ", () => {

      // log in
      wrapper.setData({
        loggedin: true
      })

      wrapper.find(UploadBox).vm.$emit('logout');
      expect(wrapper.vm.$data.loggedin).toBe(false);
    })

    test("is goTo method called ", () => {
      let goToStub = jest.fn();
      wrapper.setMethods({goTo: goToStub()})

      let button = wrapper.find('button#goToWelcomePage');
      button.trigger('click');
      expect(goToStub.mock.calls.length).toBe(1);
    })

    describe("makeToast", () => {
      let makeToastStub: jest.Mock<any,any>;

      beforeEach(() => {
        makeToastStub = jest.fn();
        wrapper.setMethods({
          makeToast: makeToastStub()
        })
      })

      test("is a toast made when there's an error with the login", () => {
          wrapper.find(LoginBox).vm.$emit('errorWithLogin');
          expect(makeToastStub.mock.calls.length).toBe(1);
      })

      test ("is a toast made when there was a succesful file upload", () => {

        // log in
        wrapper.setData({
          loggedin: true
        })

        wrapper.find(UploadBox).vm.$emit('successfullUpload');
        expect(makeToastStub.mock.calls.length).toBe(1);
      })

      test ("is a toast made when there was an unsuccesful file upload", () => {

        // login
        wrapper.setData({
          loggedin: true
        })

        wrapper.find(UploadBox).vm.$emit('errorWithFile');
        expect(makeToastStub.mock.calls.length).toBe(1);
      })
    })
  })
})
