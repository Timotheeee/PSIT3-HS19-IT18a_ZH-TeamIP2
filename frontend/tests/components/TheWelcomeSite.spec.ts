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
})
