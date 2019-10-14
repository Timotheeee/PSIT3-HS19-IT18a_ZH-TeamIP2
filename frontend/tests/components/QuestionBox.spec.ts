import { mount, shallowMount, Wrapper } from '@vue/test-utils'
import Vue from "vue"
import QuestionBox from "./../../src/components/QuestionBox.vue"
import {Answer} from "./../../src/Answer"

describe("questionbox", () => {
  let wrapper: Wrapper<Vue>;
  beforeEach(() => {
    wrapper = shallowMount(QuestionBox, {
      propsData: {
        question: "Hello?",
        possibleAnswers: [new Answer(1, "possibleAnswer")]
      }
    })
  })

  describe("is questionbox rendered correctly", () => {

    it("has to contain a button", () => {
      expect(wrapper.contains("button")).toBeTruthy();
    })

    it("has to contain a question", () => {
      expect(wrapper.contains("#question")).toBeTruthy();
    })

    it("has to contain at least one answer", () => {
      // possible answer has question as attribut name value
      expect(wrapper.contains('input[name="Hello?"]')).toBeTruthy();
    })

    test("answers have to dissappear if button pressed" , () => {
      let button = wrapper.find("button");
      button.trigger("click");
      expect(wrapper.contains('input[name="Hello?"]')).toBeFalsy();
    })
  })

  describe("are functions of questionbox called", () => {

    test("onButtonClick function", () => {
      let onButtonClickStub = jest.fn();
      let button = wrapper.find("button");
      wrapper.setMethods({ onButtonClick: onButtonClickStub()  })
      button.trigger("click");
      expect(onButtonClickStub.mock.calls.length).toBe(1);
    })
  })

  describe("are events of questionbox emitted", () => {

    test("onButtonClick event", () => {
      let button = wrapper.find("button");
      button.trigger("click");
      expect(wrapper.emitted('answerPicked').length).toBe(1);
    })
  })
})


