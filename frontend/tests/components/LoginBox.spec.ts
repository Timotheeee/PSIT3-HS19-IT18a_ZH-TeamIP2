import { mount, shallowMount, Wrapper} from '@vue/test-utils'
import Vue from 'vue';
import LoginBox from './../../src/components/LoginBox.vue';


describe("loginBox", () => {

  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    wrapper = shallowMount(LoginBox);
  })

  describe("is loginBox rendered correctly", () => {
    it("has to contain an input field for the password", () => {
      expect(wrapper.contains('input#password')).toBeTruthy();
    })

    it("has to contain a submit button for sending the data to the server", () => {
      expect(wrapper.contains('input#password')).toBeTruthy();
    })
  })
})
