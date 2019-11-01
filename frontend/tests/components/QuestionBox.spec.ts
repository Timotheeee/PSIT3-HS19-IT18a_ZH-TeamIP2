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

    it("has to contain a button group", () => {
      expect(wrapper.html().includes("b-button-group")).toBeTruthy();
    })

    it("has to contain a question", () => {
      expect(wrapper.contains(".question")).toBeTruthy();
    })

    it("has to contain a button for atleast one possibleAnswer", () => {
      expect(wrapper.contains("b-button.possible-answer")).toBeTruthy();
    })

    test("answers have to disappear if button pressed" , () => {
      expect(wrapper.contains('b-button[name="Hello?"]')).toBeTruthy();
      // selector .btn only works because only one answer button is on the site
      let button = wrapper.find("b-button.possible-answer");
      button.trigger("click");
      expect(wrapper.contains('b-button[name="Hello?"]')).toBeFalsy();
    })

    test("if last question, button for resultpage should appear", () => {
      wrapper.vm.$props.lastQuestion = true;
      expect(wrapper.contains("b-button#goToResultPage")).toBeTruthy();
    })
  })

  describe("are functions of questionbox called", () => {

    test("onButtonClick function", () => {
      // declare stub method
      let onButtonClickStub = jest.fn();
      wrapper.setMethods({ onButtonClick: onButtonClickStub()  });

      let button = wrapper.find("b-button.possible-answer");
      button.trigger("click");
      expect(onButtonClickStub.mock.calls.length).toBe(1);
    })
  })

  describe("are events of questionbox emitted", () => {

    test("onButtonClick event", () => {
      let button = wrapper.find("b-button.possible-answer");
      button.trigger("click");
      expect(wrapper.emitted('answerPicked').length).toBe(1);

      expect(wrapper.emitted('answerPicked')[0]).toStrictEqual([1,'this is my answer']);
    })
  })
})


