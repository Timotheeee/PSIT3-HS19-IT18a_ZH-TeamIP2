import { mount, shallowMount, Wrapper } from '@vue/test-utils'
import Vue from "vue"
import QuestionPack from "./../../src/components/QuestionPack.vue"
import QuestionBox from "./../../src/components/QuestionBox.vue"
import { Question } from "../../src/model/Question"
import { Answer } from '../../src/model/Answer'

describe("QuestionPack", () => {
  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    let question = new Question(1, "hello", false);
    question.addPossibleAnswer(new Answer(1, "ok"));

    wrapper = shallowMount(QuestionPack, {
      propsData: {
        question: question
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
      // create answerstub
      let answer = new Answer(1, 'this is my answer');

      // after answerPicked event updateAnswer is called
      wrapper.find(QuestionBox).vm.$emit('answerPicked', answer);
      expect(wrapper.emitted('processNextQuestion').length).toBe(1);
    })
  })
})


