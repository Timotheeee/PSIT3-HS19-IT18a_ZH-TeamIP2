import { mount, shallowMount, Wrapper } from '@vue/test-utils'
import Vue from 'vue';
import ChatInteraction from './../../src/components/ChatInteraction.vue';
import QuestionPack from './../../src/components/QuestionPack.vue';
import ResultAnswer from './../../src/components/ResultAnswer.vue';


describe("chatinteraction", () => {
  let wrapper: Wrapper<Vue>;
  beforeEach(() => {
    wrapper = shallowMount(ChatInteraction)
  })

  describe("is chatinteraction rendered correctly", () => {

    it("has to contains atleast one questionPack", () => {
      expect(wrapper.html().includes("question-pack")).toBeTruthy();
    })

    it ("has to contain a header", () => {
      expect(wrapper.html().includes("the-header")).toBeTruthy();
    })
  })


  describe("are events received", () => {

    test("is processNextQuestion received and processQuestion called", () =>  {
      let processQuestionStub = jest.fn();
      wrapper.setMethods({ processQuestion: processQuestionStub()})
      wrapper.find(QuestionPack).vm.$emit('processNextQuestion');
      expect(processQuestionStub.mock.calls.length).toBe(1);
    })

    test("is submit received and onSubmit called", () =>  {
      let onSubmitStub = jest.fn();
      wrapper.setMethods({ onSubmit: onSubmitStub()})

      let wrapperResultAnswer = shallowMount(ResultAnswer);
      wrapperResultAnswer.vm.$emit('submit');

      expect(onSubmitStub.mock.calls.length).toBe(1);
    })


  })
})
