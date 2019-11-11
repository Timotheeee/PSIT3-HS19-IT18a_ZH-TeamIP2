import { mount, shallowMount, Wrapper } from '@vue/test-utils'
import Vue from 'vue';
import QuestionBox from './../../src/components/ResultAnswer.vue';
import answerArrayStub from './AnswerArrayStub';
import answerStub from './AnswerStub';

describe("resultAnswer", () => {
  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    wrapper = shallowMount(QuestionBox, {
      propsData: {
        possibleAnswers: answerArrayStub
      }
    })
  })

  describe("is result-answer rendered correctly", () => {

    it("has to contain a button group", () => {
      expect(wrapper.html().includes("button-group")).toBeTruthy();
    })

    it("has to contain a button for at least one possibleAnswer", () => {
      expect(wrapper.contains("button.possible-answer")).toBeTruthy();
    })

    test("button has to contain special id", () => {
      expect(wrapper.contains("button#goToResultPage")).toBeTruthy();
    })

    test("button has to contain type of submit", () => {
      expect(wrapper.contains("button[type='submit']")).toBeTruthy();
    })
  })
})


