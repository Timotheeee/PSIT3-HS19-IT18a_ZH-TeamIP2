import { mount, shallowMount, Wrapper } from '@vue/test-utils'
import Vue from "vue"
import QuestionBox from "./../../src/components/QuestionBox.vue"
import {Answer} from "./../Answer.ts"

describe("is questionbox rendered correctly", () => {
  let wrapper: Wrapper<Vue>;
  beforeEach(() => {
    wrapper = shallowMount(QuestionBox)
  })

  it("has to contain a button", () => {
    expect(wrapper.contains("button")).toBeTruthy();
  })

  it("has to contain a question", () => {
    expect(wrapper.contains("#question")).toBeTruthy();
  })

  it("has to contain at least one question", () => {
    // TODO
  })

  test("answers have to dissappear if button pressed" , () => {
    // TODO
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
    wrapper.setMethods({ onButtonClick: onButtonClickStub()  })
    button.trigger("click");
    expect(onButtonClickStub.mock.calls.length).toBe(1);
  })
})

describe("are events of questionbox emitted", () => {
  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    wrapper = shallowMount(QuestionBox);
  })

  test("onButtonClick event", () => {
    let button = wrapper.find("button");
    button.trigger("click");
    expect(wrapper.emitted('answerPicked').length).toBe(1);
  })
})
