import { mount, shallowMount, Wrapper} from '@vue/test-utils'
import Vue from 'vue';
import TheAdminPage from './../../src/components/TheAdminPage.vue';


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
      let loggedin = true;
      wrapper.setData({
        loggedin
      })
      expect(wrapper.html().includes("upload-box")).toBeTruthy();
    })
  })

  describe("are events received", () => {

  })
})
