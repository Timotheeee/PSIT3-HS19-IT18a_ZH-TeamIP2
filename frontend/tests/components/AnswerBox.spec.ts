import { mount, shallowMount, Wrapper } from '@vue/test-utils'
import Vue from "vue"
import AnswerBox from './../../src/components/ChatInteraction.vue';


describe("answerbox", () => {
  let wrapper: Wrapper<Vue>;
  beforeEach(() => {
    wrapper = shallowMount(AnswerBox, {
      propsData: {
        answer: 'this is my answer'
      }
    })
  })

  describe("is answerbox rendered correctly", () => {

    it("should display one answer", () => {
      expect(wrapper.find('p.answer')).toBeTruthy();
      expect(wrapper.html().includes('this is my answer')).toBeTruthy();
    })
  })
})
