import { mount, shallowMount, Wrapper } from '@vue/test-utils'
import QuestionBox from "./../../src/components/QuestionBox.vue"
import Vue from "vue";

describe("is questionbox rendered correctly", () => {
  let wrapper: Wrapper<Vue>;
  beforeEach(() => {
    wrapper = shallowMount(QuestionBox);
  })

  it("has to contain a button", () => {
    expect(wrapper.contains("button")).toBeTruthy();
  })

  it("has to contain a question", () => {
    expect(wrapper.contains("#question")).toBeTruthy();
  })

  it("has to contain atleast one answer", () => {
    expect(wrapper.contains("input[name=answer]")).toBeTruthy();
  })
})


describe("are functions of questionbox called", () => {

  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    wrapper = shallowMount(QuestionBox);
  })

  test("onButtonClick function", () => {
    let onButtonClickStub = jest.fn();
    let button = wrapper.find("button");
    wrapper.setMethods({ onButtonClick: onButtonClickStub })
    button.trigger("click");
    expect(onButtonClickStub.mock.calls.length).toBe(1)
  })
})
