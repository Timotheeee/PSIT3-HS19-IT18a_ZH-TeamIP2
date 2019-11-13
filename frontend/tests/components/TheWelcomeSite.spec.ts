import { mount, shallowMount, Wrapper } from '@vue/test-utils'
import Vue from 'vue';
import TheWelcomeSite from './../../src/components/TheWelcomeSite.vue';


describe("welcomesite", () => {
  let wrapper: Wrapper<Vue>;
  beforeEach(() => {
    wrapper = shallowMount(TheWelcomeSite)
  })

  describe("is theWelcomeSite rendered correctly", () => {

    it("has to contain a title", () => {
      expect(wrapper.contains('#title')).toBeTruthy();
    })

    it ("has to contain a header", () => {
      expect(wrapper.html().includes("the-header")).toBeTruthy();
    })

    it("has to contain a button to go to the questionnaire", () => {
      expect(wrapper.contains('button#goToQuestionnaire')).toBeTruthy();
    })

    it("has to contain a button to go to the adminpage", () => {
      expect(wrapper.contains('button#goToAdminPage')).toBeTruthy();
    })

    it("has to contain a list with all the teammembers", () => {
      expect(wrapper.contains('ul#teammembers')).toBeTruthy();
    })
  })

  describe("are functions of the welcomesite called", () => {
    let goToStub: jest.Mock<any,any>;

    beforeEach(() => {
      goToStub = jest.fn();
      wrapper.setMethods({goTo: goToStub});
    })
    test ("go to adminpage button", () => {
      let button = wrapper.find("button#goToQuestionnaire");
      button.trigger('click');
      expect(goToStub).toHaveBeenCalled();
    })

    test ("go to questionnaire button", () => {
      let button = wrapper.find("button#goToAdminPage");
      button.trigger('click');
      expect(goToStub).toHaveBeenCalled();
    })
  })
})
