import { mount, shallowMount, Wrapper } from '@vue/test-utils'
import Vue from 'vue';
import QuestionBox from './../../src/components/ChoiceAnswer.vue';
import answerArrayStub from './AnswerArrayStub';
import answerStub from './AnswerStub';

describe("choiceAnswer", () => {
  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    wrapper = shallowMount(QuestionBox, {
      propsData: {
        possibleAnswers: answerArrayStub
      }
    })
  })

  describe("is choice-answer rendered correctly", () => {

    it("has to contain a button group", () => {
      expect(wrapper.html().includes("button-group")).toBeTruthy();
    })

    it("has to contain a button for at least one possibleAnswer", () => {
      expect(wrapper.contains("button.possible-answer")).toBeTruthy();
    })

    test("answers have to disappear if button pressed" , () => {
      expect(wrapper.contains('button[value="this is my answer"]')).toBeTruthy();
      // selector .btn only works because only one answer button is on the site
      let button = wrapper.find("button.possible-answer");
      button.trigger("click");
      expect(wrapper.contains('button[value="this is my answer"]')).toBeFalsy();
      expect(wrapper.contains('b-button-group.possible-answer')).toBeFalsy();
    })

  })

  describe("are functions of choice-answer called", () => {

    test("onButtonClick function", () => {
      // declare stub method
      let onButtonClickStub = jest.fn();
      wrapper.setMethods({ onButtonClick: onButtonClickStub()  });

      let button = wrapper.find("button.possible-answer");
      button.trigger("click");
      expect(onButtonClickStub.mock.calls.length).toBe(1);
    })


    test("select Answer", () => {
      // declare stub method
      let selectAnswerStub = jest.fn();
      wrapper.setMethods({ selectAnswer: selectAnswerStub  });

      let button = wrapper.find("button.possible-answer");

      // test only the most important keyevents for our application
      button.trigger("keyup.down");
      expect(selectAnswerStub).toHaveBeenCalled();
      button.trigger("keyup.up");
      expect(selectAnswerStub).toHaveBeenCalledTimes(2);
      button.trigger("keyup.right");
      expect(selectAnswerStub).toHaveBeenCalledTimes(3);
      button.trigger("keyup.enter");
      expect(selectAnswerStub).toHaveBeenCalledTimes(4);

    })
  })

  describe("are events of choice-answer emitted", () => {

    test("onButtonClick event", () => {
      let button = wrapper.find("button.possible-answer");
      button.trigger("click");
      expect(wrapper.emitted().answerPicked).toBeTruthy();
      expect(wrapper.emitted('answerPicked')[0][0]).toStrictEqual(answerStub);
    })

    
  })
})


