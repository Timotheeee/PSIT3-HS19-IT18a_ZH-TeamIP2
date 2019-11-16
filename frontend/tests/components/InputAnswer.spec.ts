import { mount, shallowMount, Wrapper } from '@vue/test-utils'
import Vue from 'vue';
import QuestionBox from './../../src/components/InputAnswer.vue';
import answerArrayStub from './AnswerArrayStub';
import answerStub from './AnswerStub';

describe("inputAnswer", () => {
  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    wrapper = shallowMount(QuestionBox, {
      propsData: {
        possibleAnswers: answerArrayStub
      }
    })
  })

  describe("is input-answer rendered correctly", () => {

    it("has to contain an input field", () => {
      expect(wrapper.contains("input")).toBeTruthy();
    })

    it("has to contain a button submitting answer", () => {
      expect(wrapper.contains("button.possible-answer")).toBeTruthy();
    })

    test("input and button have to disappear if button pressed" , () => {
      expect(wrapper.contains("input")).toBeTruthy();
      expect(wrapper.contains("button.possible-answer")).toBeTruthy();
      // selector .btn only works because only one answer button is on the site
      let button = wrapper.find("button.possible-answer");
      button.trigger("click");
      expect(wrapper.contains("input")).toBeFalsy();
      expect(wrapper.contains("button.possible-answer")).toBeFalsy();
    })
  })

  describe("are functions of input-answer called", () => {

    test("onButtonClick function", () => {
      // declare stub method
      let onButtonClickStub = jest.fn();
      wrapper.setMethods({ onButtonClick: onButtonClickStub  });

      let button = wrapper.find("button.possible-answer");
      button.trigger("click");
      expect(onButtonClickStub).toHaveBeenCalled()
    })
  })

  describe("are events of input-answer emitted", () => {

    test("onButtonClick event", () => {
      let button = wrapper.find("button.possible-answer");
      button.trigger("click");
      expect(wrapper.emitted().answerPicked).toBeTruthy();

      expect(wrapper.emitted('answerPicked')[0][0]).toStrictEqual(answerStub);
    })
  })
})


