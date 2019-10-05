import { mount, shallowMount, Wrapper } from '@vue/test-utils'
import Vue from "vue"
import ChatBox from "./../../src/components/ChatBox.vue"
import QuestionBox from "./../../src/components/QuestionBox.vue"


describe("are events of questionbox received", () => {

  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    wrapper = shallowMount(ChatBox);
  })

  test("setPickedAnswer function", () => {
    let setPickedAnswerStub = jest.fn();
    wrapper.setMethods({ setPickedAnswer: setPickedAnswerStub})
    wrapper.find(QuestionBox).vm.$emit('answerGiven');
    expect(setPickedAnswerStub.mock.calls.length).toBe(1);
  })
})
