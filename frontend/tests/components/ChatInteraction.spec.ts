import { mount, shallowMount, Wrapper } from '@vue/test-utils'
import Vue from "vue"
import ChatInteraction from "./../../src/components/ChatInteraction.vue"


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
})
