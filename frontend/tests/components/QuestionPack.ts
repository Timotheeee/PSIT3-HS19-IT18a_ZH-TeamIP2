import { mount, shallowMount, Wrapper } from '@vue/test-utils'
import Vue from "vue"
import QuestionPack from "./../../src/components/QuestionPack.vue"
import QuestionBox from "./../../src/components/QuestionBox.vue"
import { Question } from "../../src/model/Question"
import { Answer } from '../../src/model/Answer'

describe("QuestionPack", () => {
  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    let question = new Question(1, "hello");
    question.addPossibleAnswer(new Answer(1, "ok"));

    wrapper = shallowMount(QuestionPack, {
      propsData: {
        question: question
      }
    });
  })

  describe("are events of questionbox received", () => {

    test("updateAnswer function", () => {
      let updateAnswerStub = jest.fn();
      wrapper.setMethods({ updateAnswer: updateAnswerStub})
      wrapper.find(QuestionBox).vm.$emit('answerPicked');
      expect(updateAnswerStub.mock.calls.length).toBe(1);
    })
  })
})


