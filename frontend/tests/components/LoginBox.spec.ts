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

    it("has to contain an input field for the username", () => {
      expect(wrapper.contains('input#name')).toBeTruthy();
    })

    it("has to contain a submit button for sending the data to the server", () => {
      expect(wrapper.contains('button#userDataSubmit')).toBeTruthy();
    })
  })

  describe("are functions of loginbox called", () => {
    test("submitUserdata function", () => {
      let submitUserdataStub = jest.fn();
      wrapper.setMethods({ submitUserdata: submitUserdataStub()  });

      let button = wrapper.find("button#userDataSubmit");
      button.trigger("click");
      expect(submitUserdataStub.mock.calls.length).toBe(1);
    })
  })
})
