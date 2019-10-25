import { mount, shallowMount, Wrapper} from '@vue/test-utils'
import Vue from 'vue';
import TheResultSite from './../../src/components/TheResultSite.vue';


describe("resultsite", () => {
  let wrapper: Wrapper<Vue>;
  beforeEach(() => {
    wrapper = shallowMount(TheResultSite)
  })

  describe("is resultsite rendered correctly", () => {

    it ("has to contain a header", () => {
      expect(wrapper.html().includes("the-header")).toBeTruthy();
    })

    it("has to contain a score", () => {
      expect(wrapper.contains('h1#score')).toBeTruthy();
    })

    it("should render atleast one advice", () => {
      expect(wrapper.contains('p.advice')).toBeTruthy();
    })
  })
})
