import { mount, shallowMount, Wrapper} from '@vue/test-utils'
import Vue from "vue"
import TheAdminPage from "./../../src/components/TheAdminPage.vue"


describe("adminsite", () => {
  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    wrapper = shallowMount(TheAdminPage)
  })


  describe("is theAdminPage rendered correctly", () => {
    it("has to contain a header", () => {
      expect(wrapper.html().includes("the-header")).toBeTruthy();
    })

    it("has to contain a button to go back to welcome page", () => {
      expect(wrapper.contains('button#goToWelcomePage')).toBeTruthy();
    })

    it("has to contain an input element for the question file", () => {
      expect(wrapper.contains('input#file')).toBeTruthy();
    })

    it("has to contain a button to download the example file", () => {
      expect(wrapper.find("a.btn")).toBeTruthy();
    })
  })

  describe("are methods of theadminpage called", () => {

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

    test("post method", () => {
      let postStub = jest.fn();
      wrapper.setMethods({ post: postStub()  });

      let button = wrapper.find("button#submitFile");
      button.trigger("click");
      expect(postStub.mock.calls.length).toBe(1);
    })
  })
})
