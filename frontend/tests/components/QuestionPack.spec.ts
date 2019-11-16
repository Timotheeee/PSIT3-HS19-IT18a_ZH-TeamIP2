import { mount, shallowMount, Wrapper } from '@vue/test-utils'
import Vue from 'vue';
import QuestionPack from './../../src/components/QuestionPack.vue';
import InputAnswer from './../../src/components/InputAnswer.vue';
import ChoiceAnswer from './../../src/components/ChoiceAnswer.vue';
import ResultAnswer from './../../src/components/ResultAnswer.vue';
import questionStub, {QuestionStub} from './QuestionStub';
import answerStub from './AnswerStub';

describe("questionpack", () => {
  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    wrapper = shallowMount(QuestionPack, {
      propsData: {
        question: questionStub
      }
    });
  })

  describe("is questionpack rendered correctly", () => {

    it("has to contain a question", () => {
      expect(wrapper.contains("p.question")).toBeTruthy();
    })

    it("should contain a choice-answer if answer-type is choice", () => {
      wrapper.vm.$props.question = new QuestionStub("choice");
      expect(wrapper.html().includes('choice-answer')).toBeTruthy();
    })

    it("should contain a input-answer if answer-type is input", () => {
      wrapper.vm.$props.question = new QuestionStub("input");
      expect(wrapper.html().includes('input-answer')).toBeTruthy();
    })

    it("should contain a result-answer if answer-type is result", () => {
      wrapper.vm.$props.question = new QuestionStub("result");
      expect(wrapper.html().includes('result-answer')).toBeTruthy();
    })

    it("should contain an answer-box", () => {
      expect(wrapper.html().includes('answer-box')).toBeTruthy();
    })
  })

  describe("are events of possible answer received", () => {
    test("is updateAnswer method called", () => {
      let updateAnswerStub = jest.fn();
      wrapper.setMethods({ updateAnswer: updateAnswerStub})
      wrapper.find(ChoiceAnswer).vm.$emit('answerPicked');
      expect(updateAnswerStub).toHaveBeenCalled()
    })
  })

  describe("are events of questionPack emitted", () => {
    test("if updateAnswer called, is processNextQuestion emitted", () =>  {
      // after answerPicked event updateAnswer is called
      wrapper.find(ChoiceAnswer).vm.$emit('answerPicked', answerStub);
      expect(wrapper.emitted().processNextQuestion).toBeTruthy();
    })
  })
})


