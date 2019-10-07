import { mount, shallowMount, Wrapper } from '@vue/test-utils'
import Vue from "vue"
import ChatBox from "./../../src/components/ChatBox.vue"
import QuestionBox from "./../../src/components/QuestionBox.vue"


describe("are events of questionbox received", () => {

  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    wrapper = shallowMount(ChatBox);
  })

  test("updateAnswer function", () => {
    let updateAnswerStub = jest.fn();
    wrapper.setMethods({ updateAnswer: updateAnswerStub})
    wrapper.find(QuestionBox).vm.$emit('answerPicked');
    expect(updateAnswerStub.mock.calls.length).toBe(1);
  })
})
