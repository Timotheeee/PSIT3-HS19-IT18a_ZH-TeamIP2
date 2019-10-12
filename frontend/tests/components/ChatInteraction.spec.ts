import { mount, shallowMount, Wrapper } from '@vue/test-utils'
import Vue from "vue"
import ChatInteraction from "./../../src/components/ChatInteraction.vue"
import {Question} from "./../../src/Question"
import {Answer} from "./../../src/Answer"


describe("chatinteraction", () => {
  let wrapper: Wrapper<Vue>;
  beforeEach(() => {
    wrapper = shallowMount(ChatInteraction)
})

  describe("is chatinteraction rendered correctly", () => {

    it("has to contains atleast one chatbox", () => {
      expect(wrapper.contains('#chatbox')).toBeTruthy();
    })
  })
})
