/**
 * @vitest-environment happy-dom
 */
import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import Form from "../components/Form.vue";
describe("Form", () => {
  it("should render", () => {
    const wrapper = mount(Form);

    expect(wrapper.find('[data-test="name"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="country"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="taxIdentifier"]').exists()).toBeTruthy();
    expect(wrapper.find('input[type="submit"]').exists()).toBeTruthy();
  });
  //TODO: not working fix and add new test cases
  it("insert data", async () => {
    const wrapper = mount(Form);
    await wrapper
      .get('[data-test="name"]')
      .find('input[type="text"]')
      .setValue("Roger");
    await wrapper
      .get('[data-test="country"]')
      .find('input[type="text"]')
      .setValue("Bolivia");
    await wrapper
      .get('[data-test="taxIdentifier"]')
      .find('input[type="text"]')
      .setValue("1234567");
    await wrapper.find('input[type="submit"]').trigger("click");

    expect(wrapper.find("h2").text()).toEqual("values Inserted correctly");
  });
});
