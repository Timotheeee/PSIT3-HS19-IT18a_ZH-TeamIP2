import { mount, shallowMount, Wrapper } from '@vue/test-utils'
import Vue from 'vue';
import QuestionBox from './../../src/components/QuestionBox.vue';
import answerArrayStub from './AnswerArrayStub';

describe("questionbox", () => {
  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    wrapper = shallowMount(QuestionBox, {
      propsData: {
        question: "Hello?",
        possibleAnswers: answerArrayStub,
        lastQuestion: false
      }
    })
  })

  describe("is questionbox rendered correctly", () => {

    it("has to contain a button", () => {
      expect(wrapper.contains("button#emitEvent")).toBeTruthy();
    })

    it("has to contain a question", () => {
      expect(wrapper.contains("#question")).toBeTruthy();
    })

    it("has to contain at least one answer", () => {
      // possible answer has question as attribut name value
      expect(wrapper.contains('input[name="Hello?"]')).toBeTruthy();
    })

    test("answers have to dissappear if button pressed" , () => {
      expect(wrapper.contains('input[name="Hello?"]')).toBeTruthy();
      let button = wrapper.find("button#emitEvent");
      button.trigger("click");
      expect(wrapper.contains('input[name="Hello?"]')).toBeFalsy();
    })

    test("if last question, button for resultpage should appear", () => {
      wrapper.vm.$props.lastQuestion = true;
      expect(wrapper.contains("button.linkToResult")).toBeTruthy();
    })
  })

  describe("are functions of questionbox called", () => {

    test("onButtonClick function", () => {
      // declare stub method
      let onButtonClickStub = jest.fn();
      wrapper.setMethods({ onButtonClick: onButtonClickStub()  });

      let button = wrapper.find("button#emitEvent");
      button.trigger("click");
      expect(onButtonClickStub.mock.calls.length).toBe(1);
    })
  })

  describe("are events of questionbox emitted", () => {

    test("onButtonClick event", () => {
      // set data of questionbox
      wrapper.vm.$data.pickedAnswer = 'text';

      let button = wrapper.find("button#emitEvent");
      button.trigger("click");
      expect(wrapper.emitted('answerPicked').length).toBe(1);

      // [0][0] because emitted return an object in an object
      expect(wrapper.emitted('answerPicked')[0][0]).toBe('text');
    })
  })
})


