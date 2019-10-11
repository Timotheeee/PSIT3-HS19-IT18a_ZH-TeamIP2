import { mount, shallowMount, Wrapper } from '@vue/test-utils'
import Vue from "vue"
import ChatBox from "./../../src/components/ChatBox.vue"
import QuestionBox from "./../../src/components/QuestionBox.vue"
import { Question } from "./../../src/Question"
import { Answer } from '../../src/Answer'

describe("chatbox", () => {
  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    let question = new Question(1, "hello");
    question.addPossibleAnswer(new Answer(1, "ok"));

    wrapper = shallowMount(ChatBox, {
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


