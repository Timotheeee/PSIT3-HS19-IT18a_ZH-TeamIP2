import { mount, shallowMount, Wrapper } from '@vue/test-utils'
import Vue from 'vue';
import TheAdminPage from './../../src/components/TheAdminPage.vue';
import GraphVisualizer from './../../src/components/GraphVisualizer.vue';



describe("visualizer", () => {
  let wrapper: Wrapper<Vue>;
  let wrapperviz: Wrapper<Vue>;

  beforeEach(() => {
    wrapper = shallowMount(TheAdminPage)
    wrapperviz = shallowMount(GraphVisualizer)
  })


  describe("does the mouseover event work", () => {

    it("should work", () => {
      wrapper.setData({
        loggedin: true
      })

      setTimeout(() => {
        wrapperviz.find(".answerblock").trigger('mouseover');
        wrapper.vm.$nextTick(() => {
          expect(wrapper.props().selected != "").toBeTruthy();
        });
      }, 2000);






    })

  })


})
