import { mount, shallowMount, Wrapper } from '@vue/test-utils'
import Vue from "vue"
import QuestionPack from "./../../src/components/QuestionPack.vue"
import QuestionBox from "./../../src/components/QuestionBox.vue"
import questionStub from "./QuestionStub"
import answerStub from "./AnswerStub"

describe("questionpack", () => {
  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    wrapper = shallowMount(QuestionPack, {
      propsData: {
        question: questionStub
      }
    });
  })

  describe("is questionpack rendered correctly", () => {
    it("should contain a question-box", () => {
      expect(wrapper.html().includes('question-box')).toBeTruthy();
    })

    it("should contain an answer-box", () => {
      expect(wrapper.html().includes('answer-box')).toBeTruthy();
    })
  })

  describe("are events of questionbox received", () => {
    test("is updateAnswer method called", () => {
      let updateAnswerStub = jest.fn();
      wrapper.setMethods({ updateAnswer: updateAnswerStub})
      wrapper.find(QuestionBox).vm.$emit('answerPicked');
      expect(updateAnswerStub.mock.calls.length).toBe(1);
    })
  })

  describe("are events of questionPack emitted", () => {
    test("if updateAnswer called, is processNextQuestion emitted", () =>  {
      // after answerPicked event updateAnswer is called
      wrapper.find(QuestionBox).vm.$emit('answerPicked', answerStub);
      expect(wrapper.emitted('processNextQuestion').length).toBe(1);
    })
  })
})


