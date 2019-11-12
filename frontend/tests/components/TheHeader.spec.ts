import { mount, shallowMount, Wrapper} from '@vue/test-utils'
import Vue from 'vue';
import TheHeader from './../../src/components/TheHeader.vue';


describe("header", () => {
  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    wrapper = shallowMount(TheHeader)
  })


  describe("is theHeader rendered correctly", () => {
    it("has to contain an image of the logo", () => {
      expect(wrapper.contains('b-img')).toBeTruthy();
    })

    it("has to contain the title of our project", () => {
      expect(wrapper.html().includes('StudentScore')).toBeTruthy();
    })

  })

  describe("are functions of the header called", () => {
    test("goTo Function", () => {
      // declare stub method
      let goToStub = jest.fn();
      wrapper.setMethods({ goTo: goToStub()  });

      let image = wrapper.find("b-img");
      image.trigger("click");
      expect(goToStub.mock.calls.length).toBe(1);
    })
  })


})
