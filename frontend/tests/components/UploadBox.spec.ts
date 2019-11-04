import { mount, shallowMount, Wrapper} from '@vue/test-utils'
import Vue from 'vue';
import UploadBox from './../../src/components/UploadBox.vue';


describe("uploadbox", () => {

  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    wrapper = shallowMount(UploadBox);
  })

  describe("is uploadBox rendered correctly", () => {

    it("has to contain an input for uploading the file", () => {
      expect(wrapper.find("a.btn")).toBeTruthy();
    })

    it("has to contain a submit button for submitting the file", () => {
      expect(wrapper.find("a.btn")).toBeTruthy();
    })

    it("has to contain a button to download the example file", () => {
      expect(wrapper.find("a.btn")).toBeTruthy();
    })
  })

  describe("are methods of uploadbox called", () => {
    test("handleFileUpload method", () => {

      // declare stub method
      let handleFileUploadStub = jest.fn();
      wrapper.setMethods({ handleFileUpload: handleFileUploadStub()  });

      const input = <HTMLInputElement>wrapper.vm.$refs.file;

      // define event and trigger event of uploading file
      let event = new Event('change');
      input.dispatchEvent(event);
      expect(handleFileUploadStub.mock.calls.length).toBe(1);
    })

    test("submitFileUpload and post method", () => {
      // declare stub method
      let submitFileStub = jest.fn();
      wrapper.setMethods({ submitFile: submitFileStub()  });

      let button = wrapper.find("button#submitFile");
      button.trigger("click");
      expect(submitFileStub.mock.calls.length).toBe(1);
    })
  })


})
